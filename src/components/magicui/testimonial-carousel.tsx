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

  const getPreviewIndex = (offset: number) => {
    return (currentIndex + offset + reviews.length) % reviews.length;
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

      {/* Main Carousel Area */}
      <div className="relative flex items-center justify-center min-h-[600px] gap-4">
        <AnimatePresence mode="popLayout">
          {/* Previous Preview Card */}
          <motion.div
            key={`preview-prev-${getPreviewIndex(-1)}`}
            className="absolute left-0 top-1/2 -translate-y-1/2 opacity-50 scale-75 z-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewCard {...reviews[getPreviewIndex(-1)]} />
          </motion.div>

          {/* Featured Card */}
          <motion.div
            key={`featured-${currentIndex}`}
            className="relative z-20 scale-110"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewCard {...reviews[currentIndex]} />
          </motion.div>

          {/* Next Preview Card */}
          <motion.div
            key={`preview-next-${getPreviewIndex(1)}`}
            className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50 scale-75 z-0"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewCard {...reviews[getPreviewIndex(1)]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-primary/30 hover:bg-primary/50"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCarousel; 