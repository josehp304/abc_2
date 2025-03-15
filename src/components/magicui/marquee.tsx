"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MarqueeProps extends Omit<HTMLMotionProps<"div">, "children" | "className"> {
  vertical?: boolean;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export const Marquee = ({
  children,
  vertical,
  reverse,
  pauseOnHover,
  className,
  ...props
}: MarqueeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group flex overflow-hidden relative",
        vertical ? "flex-col" : "flex-row",
        "max-w-[100vw] after:absolute after:inset-y-0 after:right-0 after:w-24 after:bg-gradient-to-l after:from-background after:z-10",
        "before:absolute before:inset-y-0 before:left-0 before:w-24 before:bg-gradient-to-r before:from-background before:z-10",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 gap-[--gap] transition-transform duration-300",
          vertical ? "flex-col" : "flex-row",
          vertical ? "animate-marquee-vertical" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDirection: reverse ? "reverse" : "normal"
        }}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 gap-[--gap]",
          vertical ? "flex-col" : "flex-row",
          vertical ? "animate-marquee-vertical" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animationDirection: reverse ? "reverse" : "normal"
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};
