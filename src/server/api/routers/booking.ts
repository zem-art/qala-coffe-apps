import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bookingRouter = createTRPCRouter({
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
            return await ctx.db.booking.create({ data: input})
        }),

    getAll : publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.booking.findMany({
                orderBy : { createdAt : "desc" }
            })
        })
})