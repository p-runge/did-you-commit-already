import Image from "next/image";

export function User() {
  return (
    <div className="flex">
      <figure>
        <div className="relative">
          <Image
            src="https://avatars.githubusercontent.com/u/4726921?v=4"
            alt="Avatar"
            height={100}
            width={100}
            className="rounded-full"
          />
          <figcaption className="gap-5 text-center">Froxx</figcaption>
          <div className="absolute right-2 top-0 h-5 w-5 rounded-full bg-green-600"></div>
        </div>
      </figure>
    </div>
  );
}
