"use client";

import { cn } from "@/lib/utils";
import React from "react";

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
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-6",
        "bg-card/50 text-card-foreground backdrop-blur-sm",
        "border-border/20 hover:bg-accent/10",
        "transition-all duration-300 hover:scale-[1.02]"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="overflow-hidden rounded-full bg-muted/50 p-0.5 ring-1 ring-border/10">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={img}
            alt={name}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <figcaption className="text-sm font-semibold text-foreground">
            {name}
          </figcaption>
          <p className="text-xs text-muted-foreground/80">{username}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-sm text-muted-foreground/90 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

export default ReviewCard;
