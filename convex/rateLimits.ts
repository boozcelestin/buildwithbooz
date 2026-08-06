import { v } from "convex/values";

import { mutation, type MutationCtx } from "./_generated/server";

const tenMinutes = 10 * 60 * 1000;
const oneHour = 60 * 60 * 1000;
const tenMinuteLimit = 8;
const hourlyLimit = 30;

export function isRateLimited(tenMinuteCount: number, hourCount: number) {
  return tenMinuteCount >= tenMinuteLimit || hourCount >= hourlyLimit;
}

async function readCount(
  context: MutationCtx,
  ip: string,
  route: string,
  windowStart: number,
) {
  return context.db
    .query("rateLimits")
    .withIndex("by_ip_route_window", (query) =>
      query.eq("ip", ip).eq("route", route).eq("windowStart", windowStart),
    )
    .unique();
}

export const checkRateLimit = mutation({
  args: { ip: v.string(), route: v.string() },
  handler: async (context, args) => {
    const now = Date.now();
    const tenMinuteWindow = Math.floor(now / tenMinutes) * tenMinutes;
    const hourWindow = Math.floor(now / oneHour) * oneHour;
    const tenMinuteRecord = await readCount(
      context,
      args.ip,
      args.route,
      tenMinuteWindow,
    );
    const hourRecord = await readCount(context, args.ip, args.route, -hourWindow);

    if (isRateLimited(tenMinuteRecord?.count ?? 0, hourRecord?.count ?? 0)) {
      return { allowed: false };
    }

    if (tenMinuteRecord) {
      await context.db.patch(tenMinuteRecord._id, { count: tenMinuteRecord.count + 1 });
    } else {
      await context.db.insert("rateLimits", {
        ip: args.ip,
        route: args.route,
        windowStart: tenMinuteWindow,
        count: 1,
      });
    }

    if (hourRecord) {
      await context.db.patch(hourRecord._id, { count: hourRecord.count + 1 });
    } else {
      await context.db.insert("rateLimits", {
        ip: args.ip,
        route: args.route,
        windowStart: -hourWindow,
        count: 1,
      });
    }

    return { allowed: true };
  },
});
