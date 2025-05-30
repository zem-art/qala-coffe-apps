import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        price: z.string(),
        imageUrl: z.string().optional(),
        categoryId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.product.create({ data: input });
    }),

  // NOTE : client-side pagination
  getProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany({
      include: {
        category: true, // ⬅️ join ke table Category
      },
      orderBy : {
        createdAt : "desc"
      }
    });
  }),

  // NOTE : server-side pagination
  // getProducts : publicProcedure
  //   .input(z.object({ page: z.number().min(1), pageSize: z.number().min(1) }))
  //   .query(async ({ input, ctx }) => {
  //     const skip = (input.page - 1) * input.pageSize;
  //     const take = input.pageSize;

  //     const [items, total] = await Promise.all([
  //       ctx.db.product.findMany({
  //         skip,
  //         take,
  //         include: { category: true },
  //         orderBy: { id: "asc" },
  //       }),
  //       ctx.db.product.count(),
  //     ]);
  //     return { items, total };
  // }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        price: z.string(),
        imageUrl: z.string().optional(),
        categoryId: z.number(),
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

    getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.product.findUnique({
        where: { id: input.id },
      });
    }),

});

