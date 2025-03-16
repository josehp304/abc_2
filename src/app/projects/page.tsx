"use client"

import React from 'react'
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

const Projects: React.FC = () => {
    const testimonials = [
        {
          quote:
            "We organized the biggest gaming event in the world with over $20 millon price pool .",
          name: "fortnight world cup",
          designation: "worlds biggest esports event",
          src: "/images/fn.png",
        },
        {
          quote:
            "Kai Cente was able to reach a wider audience and grow his YouTube channel by 10,000 subscribers within a month after using our platform.",
          name: "Kai Cente",
          designation: "YouTuber",
          src: "/images/8878659.jpg",
        },
        {
            quote:
              "we have developed multiple high value shopify shops",
            name: "Shopify digital marketing",
            designation: "multi-million dollar stores",
            src: "/images/sp.png",
          },
          {
            quote:
              "We have generated millions of impressions for our clients with our experienced content generation team ",
            name: "Our top clients",
            designation: "Video production",
            src: "/images/bc.png",
          },
      

      ]

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <motion.div 
                className="container mx-auto px-6 py-16 sm:py-24"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                <motion.h1 
                    className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground"
                    variants={fadeInUp}
                >
                    Our Projects
                </motion.h1>
                <motion.p 
                    className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
                    variants={fadeInUp}
                >
                    See what our clients have to say about their experience working with us.
                </motion.p>
                <motion.div variants={fadeInUp}>
                    <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
                </motion.div>
            </motion.div>

        </div>
    )
}

export default Projects