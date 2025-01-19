import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import github from "~/server/utils/github";

const UserSchema = z.object({
  name: z.string(),
  profileUrl: z.string(),
  imageUrl: z.string(),
  hasContributedToday: z.boolean(),
});
export type User = z.infer<typeof UserSchema>;
export const userRouter = createTRPCRouter({
  getAll: publicProcedure.output(z.array(UserSchema)).query(async () => {
    const userNames = env.USER_LIST;

    const users = (
      await Promise.all(
        userNames.map(async (userName) => {
          const [githubUser, hasContributedToday] = await Promise.all([
            github.getUser(userName),
            github.hasUserCommitedToday(userName),
          ]);
          if (githubUser === undefined || hasContributedToday === undefined) {
            return undefined;
          }

          return {
            name: githubUser.userName,
            profileUrl: githubUser.profileUrl,
            imageUrl: githubUser.imageUrl,
            hasContributedToday,
          };
        }),
      )
    ).filter((user) => user) as User[];

    return users;
  }),
});
