import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { authRouter } from "~/server/api/routers/auth";
import { productRouter } from "./routers/products";
import { categoryRouter } from "./routers/categorys";
import { reportRouter } from "./routers/report";
import { bokkingRouter } from "./routers/bokking";
import { reviewRouter } from "./routers/reviews";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter, // ⬅️ pastikan ini ada
  product: productRouter,
  category: categoryRouter,
  dashboard : reportRouter,
  bokking : bokkingRouter,
  review: reviewRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
