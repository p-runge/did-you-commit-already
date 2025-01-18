import Image from "next/image";
import { type User } from "~/server/api/routers/user";

export function User({ user }: { user: User }) {
  return (
    <div className="flex">
      <figure>
        <div className="relative">
          <Image
            src={user.imageUrl}
            alt={`Could not load image for user profile ${user.profileUrl}`}
            height={100}
            width={100}
            className="rounded-full"
          />
          <figcaption className="gap-5 text-center">{user.name}</figcaption>
          {
            <div
              className={
                "absolute right-2 top-0 h-5 w-5 rounded-full " +
                (user.hasCommitedToday ? "bg-green-600" : "bg-red-600")
              }
            ></div>
          }
        </div>
      </figure>
    </div>
  );
}
