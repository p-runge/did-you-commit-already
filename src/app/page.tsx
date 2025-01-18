import { User } from "~/components/user";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const users = await api.user.getAll();

  return (
    <HydrateClient>
      <main className="to-primary-0 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Did You <span className="text-primary-4">Commit</span> Today?
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {users.map((user) => (
              <User key={user.name} user={user} />
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
