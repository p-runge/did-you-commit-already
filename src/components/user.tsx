import Image from "next/image";
import Link from "next/link";
import { type User } from "~/server/api/routers/user";
import { cn } from "~/server/utils/cn";

export function User({ user }: { user: User }) {
  const timezoneOfChoice = 2; // Germany
  const now = new Date();
  const is11PMOrLater = now.getUTCHours() + timezoneOfChoice - 1 >= 23;
  const isGlowing = is11PMOrLater && !user.hasContributedToday;

  return (
    <Link target="_blank" href={user.profileUrl} className="flex">
      <figure>
        <div className="relative">
          <Image
            src={user.imageUrl}
            alt={`Could not load image for user profile ${user.profileUrl}`}
            height={200}
            width={200}
            className={cn(
              "rounded-full border-2 border-white",
              isGlowing && "animate-glow",
            )}
          />
          <figcaption className="gap-5 text-center text-2xl font-light">
            {user.name}
          </figcaption>
          {
            <div
              className={cn(
                "absolute right-0 top-0 h-14 w-14 rounded-full border-2 border-white",
                user.hasContributedToday ? "bg-primary-4" : "bg-primary-0",
              )}
            ></div>
          }
        </div>
      </figure>
    </Link>
  );
}
