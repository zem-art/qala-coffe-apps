import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
        imageUrl: z.string().optional(),
        categoryId: z.number(), // ⬅️ Tambah ini
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.product.create({ data: input });
    }),

  getCategories: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany();
  }),
});
