import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// TODO: define user type here

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    // TODO: read list of usernames from env, fetch them using Octokit and return the required data
    return [];
  }),
});
