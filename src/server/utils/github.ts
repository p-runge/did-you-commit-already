import { Octokit } from "octokit";

const octokit = new Octokit();

const getUser = async (username: string) => {
  const { data } = await octokit.rest.users.getByUsername({
    username,
  });

  return data;
};

async function getAmountOfTodaysEvents(username: string) {
  const { data: events } =
    await octokit.rest.activity.listReceivedEventsForUser({
      username,
      per_page: 10,
    });

  const germanTimezone = 2;
  const today = new Date(new Date().getTime() + germanTimezone * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]!;
  console.log(username, today, events);

  return events.filter((event) => event.created_at?.startsWith(today)).length;
}

const github = {
  getUser,
  getAmountOfTodaysEvents,
};
export default github;
