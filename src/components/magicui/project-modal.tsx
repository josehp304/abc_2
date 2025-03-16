"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface ProjectDetails {
  title: string;
  overview: string;
  description: string;
  keyAchievement: string;
  services: string[];
  image: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectDetails;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
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
              <div className="mt-4">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{project.title}</h2>
                
                <div className="aspect-video overflow-hidden rounded-lg mb-6">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Overview</h3>
                    <p className="text-muted-foreground">{project.overview}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Key Achievement</h3>
                    <p className="text-primary">{project.keyAchievement}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Services Utilized</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 