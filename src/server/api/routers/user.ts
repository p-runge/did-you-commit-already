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
        userNames.map(async (userName) => ({
          name: userName,
          profileUrl: `https://github.com/${userName}`,
          ...(await github.getData(userName)),
        })),
      )
    ).filter((githubData) => githubData.imageUrl);

    return users;
  }),
});
