import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bokkingRouter = createTRPCRouter({
    create : publicProcedure
        .input(
            z.object({ 
                name : z.string(),
                email : z.string(),
                phone : z.string(),
                message : z.string(),
                number: z.number(),
            }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.db.bokking.create({ data: input})
        }),

    getAll : publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.bokking.findMany({
                orderBy : { createdAt : "desc" }
            })
        })
})