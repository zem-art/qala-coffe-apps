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
        }),

    getById : publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input, ctx }) => {
            return await ctx.db.booking.findUnique({
                where: { id: input.id }
            })
        }),

    update : publicProcedure
        .input(
            z.object({ 
                id: z.string(),
                name : z.string(),
                email : z.string(),
                phone : z.string().optional(),
                message : z.string(),
                number: z.number(),
            }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.db.booking.update({
                where: { id: input.id },
                data: {
                    name: input.name,
                    email: input.email,
                    phone: input.phone,
                    message: input.message,
                    number: input.number,
                }
            })
        }),

    delete : publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.db.booking.delete({
                where: { id: input.id }
            })
        })
})