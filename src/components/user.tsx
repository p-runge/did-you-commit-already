import Image from "next/image";
import Link from "next/link";
import { type User } from "~/server/api/routers/user";

export function User({ user }: { user: User }) {
  return (
    <Link target="_blank" href={user.profileUrl} className="flex">
      <figure>
        <div className="relative">
          <Image
            src={user.imageUrl}
            alt={`Could not load image for user profile ${user.profileUrl}`}
            height={200}
            width={200}
            className="rounded-full"
          />
          <figcaption className="gap-5 text-center text-2xl">
            {user.name}
          </figcaption>
          {
            <div
              className={
                "absolute right-2 top-0 h-12 w-12 rounded-full " +
                (user.hasContributedToday ? "bg-primary-4" : "bg-primary-0")
              }
            ></div>
          }
        </div>
      </figure>
    </Link>
  );
}
