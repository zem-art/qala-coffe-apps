import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";

export const reportRouter = createTRPCRouter({
    getCounts: publicProcedure.query(async ({ ctx }) => {
        const userCount = await ctx.db.user.count({
            where : { role : "2"}
        });
        const productCount = await ctx.db.product.count();
        const categoryCount = await ctx.db.category.count();

        return {
            userCount,
            productCount,
            categoryCount,
        };
    }),

    getStatisticsReview: publicProcedure
    .input(
        z.object({
            startDate: z.string().optional(), // format: YYYY-MM-DD
            endDate: z.string().optional(),
        })
        )
        .query(async ({ ctx, input }) => {
        const { startDate, endDate } = input;

        const where: Prisma.ReviewWhereInput = {};

        if (startDate || endDate) {
            where.createdAt = {
            gte: startDate ? new Date(startDate) : undefined,
            lte: endDate ? new Date(endDate) : undefined,
            };
        }

        const reviews = await ctx.db.review.findMany({
            where,
            orderBy: { createdAt: "asc" },
        });

        // Initialize counters
        const ratingsCount: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        const dailyReviews: Record<string, number> = {};
        let total = 0;
        let totalRating = 0;

        for (const r of reviews) {
            total++;
            totalRating += r.rating;
            ratingsCount[r.rating] = (ratingsCount[r.rating] || 0) + 1;

            const dateKey = r.createdAt?.toISOString().split("T")[0] ?? "";
            if (dateKey) {
                dailyReviews[dateKey] = (dailyReviews[dateKey] || 0) + 1;
            }
        }

        const averageRating = total === 0 ? 0 : parseFloat((totalRating / total).toFixed(2));

        return {
            totalReviews: total,
            averageRating,
            ratingsCount,
            dailyReviews,
        };
    }),
})