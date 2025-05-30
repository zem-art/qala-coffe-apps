import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const reportRouter = createTRPCRouter({
    getCounts: publicProcedure.query(async ({ ctx }) => {
        const userCount = await ctx.db.user.count();
        const productCount = await ctx.db.product.count();

        return {
            userCount,
            productCount,
        };
    }),
})