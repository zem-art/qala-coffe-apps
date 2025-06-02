import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.review.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  }),
})