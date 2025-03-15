"use client"

import { cn } from "@/lib/utils";

interface ReviewCardProps {
  img: string;
  name: string;
  username: string;
  body: string;
}

const ReviewCard = ({ img, name, username, body }: ReviewCardProps) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <blockquote>
        <p className="text-sm text-muted-foreground">{body}</p>
      </blockquote>
      <figcaption className="relative mt-6 flex items-center justify-start gap-4">
        <div className="overflow-hidden rounded-full bg-gray-950/10 p-1 dark:bg-gray-50/10">
          <img
            className="h-8 w-8 rounded-full bg-gray-950/10 object-cover dark:bg-gray-50/10"
            src={img}
            alt={name}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="text-sm font-medium text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{username}</div>
        </div>
      </figcaption>
    </figure>
  );
};

export default ReviewCard;