import resultBlocksJson from "./result-blocks.json";
import type { GoalId, LeakId, RankedResult, ResultBlock } from "./types";

type ResultBlocks = Record<GoalId, Record<LeakId, ResultBlock>>;

const resultBlocks = resultBlocksJson as ResultBlocks;

export function assembleResults(goal: GoalId, rankedLeaks: LeakId[]): RankedResult[] {
  return rankedLeaks.map((leak) => {
    const block = resultBlocks[goal]?.[leak];

    if (!block) {
      throw new Error(`Missing Gap Finder result block for ${goal} and ${leak}.`);
    }

    return { leak, block };
  });
}
