"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaQuoteLeft } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: {
    name: string;
    username: string;
    role: string;
    location: string;
    body: string;
    img: string;
    rating: number;
  } | null;
}

const TestimonialModal = ({ isOpen, onClose, review }: TestimonialModalProps) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
          >
            <div className={cn(
              "relative rounded-xl overflow-hidden",
              "bg-gradient-to-br from-card via-card/95 to-card/90",
              "border border-border/20 shadow-xl",
              "p-6 md:p-8"
            )}>
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center text-center">
                {/* Profile Image */}
                <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full bg-muted/50 p-0.5 ring-2 ring-border/10 mb-4">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* User Info */}
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                  {review.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">{review.username}</p>
                <p className="text-sm font-medium text-primary/80 mb-2">{review.role}</p>
                <p className="text-xs text-muted-foreground mb-6">{review.location}</p>

                {/* Review */}
                <div className="relative">
                  <FaQuoteLeft className="absolute -top-4 left-0 text-primary/20 text-4xl" />
                  <blockquote className="text-base md:text-lg text-foreground/90 leading-relaxed pt-8">
                    "{review.body}"
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TestimonialModal; 