"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { FaStar, FaStarHalf, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface ReviewCardProps {
  img: string;
  name: string;
  username: string;
  role: string;
  location: string;
  body: string;
  rating: number;
}

const ReviewCard = ({ img, name, username, role, location, body, rating }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`star-${i}`} className="text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalf key="half-star" className="text-yellow-400" />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar key={`empty-star-${i}`} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <motion.figure
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl p-6",
        "bg-gradient-to-br from-card/50 via-card/30 to-card/50 text-card-foreground backdrop-blur-sm",
        "border border-border/20 shadow-lg hover:shadow-xl",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="overflow-hidden rounded-full bg-muted/50 p-0.5 ring-1 ring-border/10"
        >
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={img}
            alt={name}
          />
        </motion.div>
        <div className="flex flex-col gap-0.5">
          <motion.figcaption 
            whileHover={{ scale: 1.05 }}
            className="text-sm font-semibold text-foreground"
          >
            {name}
          </motion.figcaption>
          <p className="text-xs text-muted-foreground/80">{username}</p>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-xs font-medium text-primary/80"
          >
            {role}
          </motion.p>
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1"
        >
          {renderStars(rating)}
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-1 text-xs text-muted-foreground/70"
        >
          <FaMapMarkerAlt className="h-3 w-3" />
          <span>{location}</span>
        </motion.div>
      </div>

      <motion.blockquote 
        whileHover={{ scale: 1.01 }}
        className="mt-4 text-sm text-muted-foreground/90 leading-relaxed"
      >
        {body}
      </motion.blockquote>
    </motion.figure>
  );
};

export default ReviewCard;
