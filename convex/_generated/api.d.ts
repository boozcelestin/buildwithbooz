/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as gapFinder from "../gapFinder.js";
import type * as gapFinderEmail from "../gapFinderEmail.js";
import type * as leads from "../leads.js";
import type * as assessmentEmail from "../assessmentEmail.js";
import type * as assessmentIntake from "../assessmentIntake.js";
import type * as assessmentOrders from "../assessmentOrders.js";
import type * as rateLimits from "../rateLimits.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  gapFinder: typeof gapFinder;
  gapFinderEmail: typeof gapFinderEmail;
  leads: typeof leads;
  assessmentEmail: typeof assessmentEmail;
  assessmentIntake: typeof assessmentIntake;
  assessmentOrders: typeof assessmentOrders;
  rateLimits: typeof rateLimits;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
