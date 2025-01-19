import { env } from "~/env";
import { Octokit } from "octokit";
import { z } from "zod";

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
  const { data } = await octokit.rest.users.getByUsername({
    username,
  });
  return {
    userName: data.login,
    imageUrl: data.avatar_url,
    profileUrl: data.html_url,
    hasContributedToday: false,
  } satisfies Exclude<User, "hasContributedToday">;
}

async function hasUserCommitedToday(username: string) {
  const { data } = await octokit.rest.activity.listPublicEventsForUser({
    username,
  });

  const todaysEvents = data.filter(
    (event) =>
      event.created_at &&
      new Date(event.created_at).getDate() === new Date().getDate(),
  );
  console.log("todaysEvents", todaysEvents);

  return todaysEvents.length > 0;
}

const github = {
  getUser,
  hasUserCommitedToday,
};
export default github;
