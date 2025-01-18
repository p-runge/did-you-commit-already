import { Octokit } from "octokit";

const octokit = new Octokit();

const getUser = async (username: string) => {
  const { data } = await octokit.rest.users.getByUsername({
    username,
  });

  return data;
};

const github = {
  getUser,
};
export default github;
