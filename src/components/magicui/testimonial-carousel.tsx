"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewCard from "./reviewcard";
import { cn } from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface TestimonialCarouselProps {
  reviews: Array<{
    img: string;
    name: string;
    username: string;
    role: string;
    location: string;
    body: string;
    rating: number;
  }>;
}

export const TestimonialCarousel = ({ reviews }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background dark:bg-card dark:hover:bg-card/80 text-foreground p-3 rounded-full shadow-lg transition-all duration-200"
        aria-label="Previous testimonial"
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background dark:bg-card dark:hover:bg-card/80 text-foreground p-3 rounded-full shadow-lg transition-all duration-200"
        aria-label="Next testimonial"
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      {/* Cards Container */}
      <div className="flex items-center justify-center gap-6 py-8">
        <AnimatePresence mode="popLayout">
          {reviews.slice(currentIndex, currentIndex + 3).map((review, idx) => (
            <motion.div
              key={review.username}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <ReviewCard {...review} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * 3)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              Math.floor(currentIndex / 3) === index
                ? "bg-primary w-6"
                : "bg-primary/30 hover:bg-primary/50"
            )}
            aria-label={`Go to testimonial group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel; 