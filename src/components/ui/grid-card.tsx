"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GridCardProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  className?: string;
  children: React.ReactNode;
}

export const GridCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  ({ className, children, ...props }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement>(null);
    
    // Combine refs
    const combinedRef = (node: HTMLDivElement) => {
      // Update the forwarded ref if it exists
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
      
      // Update our local ref
      cardRef.current = node;
    };

    // Add event listeners to handle hover effects
    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;

      const handleMouseEnter = () => {
        card.style.zIndex = "50";
      };

      const handleMouseLeave = () => {
        card.style.zIndex = "10";
      };

      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    return (
      <motion.div
        ref={combinedRef}
        className={cn(
          "relative z-10 hover:z-50 transform-gpu backface-hidden will-change-transform",
          className
        )}
        style={{
          position: "relative",
          zIndex: 10,
          isolation: "isolate",
          pointerEvents: "auto",
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GridCard.displayName = "GridCard"; 