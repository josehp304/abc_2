"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FaStar, FaStarHalf, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import TestimonialModal from "./testimonial-modal";

interface ReviewCardProps {
  img: string;
  name: string;
  username: string;
  role: string;
  location: string;
  body: string;
  rating: number;
}

const ReviewCard = (review: ReviewCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { img, name, username, role, location, rating } = review;

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
    <>
      <motion.div
        className={cn(
          "w-64 cursor-pointer rounded-xl p-6",
          "bg-gradient-to-br from-card/50 via-card/30 to-card/50",
          "border border-border/20 shadow-lg hover:shadow-xl",
          "transition-all duration-300"
        )}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="w-20 h-20 overflow-hidden rounded-full bg-muted/50 p-0.5 ring-2 ring-border/10"
            whileHover={{ scale: 1.05 }}
          >
            <img
              className="w-full h-full rounded-full object-cover"
              src={img}
              alt={name}
            />
          </motion.div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground/80">{username}</p>
            <p className="text-sm font-medium text-primary/80">{role}</p>
            <div className="flex items-center justify-center gap-1">
              {renderStars(rating)}
            </div>
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/70">
              <FaMapMarkerAlt className="h-3 w-3" />
              <span>{location}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground/60">
            Click to read review
          </p>
        </div>
      </motion.div>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        review={review}
      />
    </>
  );
};

export default ReviewCard;
