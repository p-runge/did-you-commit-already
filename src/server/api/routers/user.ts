import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// TODO: define user type here

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    console.log("user list", env.USER_LIST);
    return [];
  }),
});
