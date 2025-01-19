import { Octokit } from "octokit";
import { z } from "zod";
import { env } from "~/env";

const octokit = new Octokit({
  auth: env.GITHUB_TOKEN,
});

const UserSchema = z.object({
  userName: z.string(),
  imageUrl: z.string(),
  profileUrl: z.string(),
  hasContributedToday: z.boolean(),
});
type User = z.infer<typeof UserSchema>;
async function getUser(username: string) {
  try {
    const { data: githubData } = await octokit.rest.users.getByUsername({
      username,
    });
    const { success, data, error } = UserSchema.omit({
      hasContributedToday: true,
    }).safeParse({
      userName: githubData.login,
      imageUrl: githubData.avatar_url,
      profileUrl: githubData.html_url,
      hasContributedToday: false,
    } satisfies Exclude<User, "hasContributedToday">);

    if (!success) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Error getting user", username, error);
    return undefined;
  }
}

async function hasUserCommitedToday(username: string) {
  try {
    const { data } = await octokit.rest.activity.listPublicEventsForUser({
      username,
    });

    const todaysEvents = data.filter(
      (event) =>
        event.created_at &&
        new Date(event.created_at).getDate() === new Date().getDate(),
    );

    return todaysEvents.length > 0;
  } catch (error) {
    console.error("Error getting user", username, error);
    return undefined;
  }
}

const github = {
  getUser,
  hasUserCommitedToday,
};
export default github;
