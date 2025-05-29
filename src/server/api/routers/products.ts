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
        categoryId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.product.create({ data: input });
    }),

  getProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany({
      include: {
        category: true, // ⬅️ join ke table Category
      },
    });
  }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        price: z.number(),
        imageUrl: z.string().optional(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      return await ctx.db.product.update({
        where: { id },
        data,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.product.delete({
        where: { id: input.id },
      });
    }),
});

