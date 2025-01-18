import { z } from "zod";
import { env } from "~/env";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import github from "~/server/utils/github";

// TODO: define user type here

const UserSchema = z.object({
  name: z.string(),
  profileUrl: z.string(),
  imageUrl: z.string(),
  hasCommitedToday: z.boolean(),
});
type User = z.infer<typeof UserSchema>;
export const userRouter = createTRPCRouter({
  getAll: publicProcedure.output(z.array(UserSchema)).query(async () => {
    const userNames = env.USER_LIST;

    const githubUsers = await Promise.all(
      userNames.map((userName) => github.getUser(userName)),
    );

    const users = githubUsers.map((githubUser) => {
      return {
        name: githubUser.login,
        profileUrl: githubUser.html_url,
        imageUrl: githubUser.avatar_url,
        hasCommitedToday: false,
      } satisfies User;
    });

    return users;
  }),
});
