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

    const githubDataList = await Promise.all(
      userNames.map(async (userName) => ({
        user: await github.getUser(userName),
        hasContributedToday: await github.getHasContributedToday(userName),
      })),
    );

    const users = githubDataList.map((githubData) => {
      console.log(githubData.user.login, githubData.hasContributedToday);
      return {
        name: githubData.user.login,
        profileUrl: githubData.user.html_url,
        imageUrl: githubData.user.avatar_url,
        hasContributedToday: githubData.hasContributedToday,
      } satisfies User;
    });

    return users;
  }),
});
