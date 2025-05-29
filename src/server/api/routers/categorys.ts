import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.category.create({ data:input })
    }),

    getCategories: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.category.findMany();
    }),
});
