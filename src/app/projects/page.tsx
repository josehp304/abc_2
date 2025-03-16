"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion, useScroll } from "framer-motion";
import { FaSun, FaMoon, FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { GridCard } from "@/components/ui/grid-card";
import Link from "next/link";
import ProjectModal from "@/components/magicui/project-modal";
import { AnimatePresence } from "framer-motion";

const Projects: React.FC = () => {
    const [darkTheme, setDarkTheme] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const { scrollYProgress } = useScroll();
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    
    // Theme toggle handler
    const toggleTheme = () => {
        const newTheme = !darkTheme;
        setDarkTheme(newTheme);
        
        try {
            localStorage.setItem("theme", newTheme ? "dark" : "light");
        } catch (e) {
            console.error("Failed to access localStorage:", e);
        }
        
        if (newTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // Initialize theme from localStorage on mount
    useEffect(() => {
        try {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark") {
                setDarkTheme(true);
                document.documentElement.classList.add("dark");
            } else {
                setDarkTheme(false);
                document.documentElement.classList.remove("dark");
            }
        } catch (e) {
            console.error("Failed to access localStorage:", e);
        }
        
        // Cleanup function to reset theme classes
        return () => {
            document.documentElement.classList.remove("dark");
        };
    }, []);

    // Handle scroll events
    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentProgress = Math.min((window.pageYOffset / totalScroll) * 100, 100);
            setScrollProgress(currentProgress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Testimonials data
    const testimonials = [
        {
            quote: "We organized the biggest gaming event in the world with over $20 million price pool.",
            name: "Fortnight World Cup",
            designation: "World's Biggest Esports Event",
          src: "/images/fn.png",
        },
        {
            quote: "Kai Cente was able to reach a wider audience and grow his YouTube channel by 10,000 subscribers within a month after using our platform.",
          name: "Kai Cente",
          designation: "YouTuber",
          src: "/images/8878659.jpg",
        },
        {
            quote: "We have developed multiple high value shopify shops",
            name: "Shopify Digital Marketing",
            designation: "Multi-million Dollar Stores",
            src: "/images/sp.png",
          },
          {
            quote: "We have generated millions of impressions for our clients with our experienced content generation team",
            name: "Our Top Clients",
            designation: "Video Production",
            src: "/images/bc.png",
          },
    ];

    // Project data
    const projects = [
        {
            title: "Ignite Esports Tournament: Fueling Community Engagement",
            overview: "A comprehensive esports tournament management solution",
            description: "Gooners Studio partnered with Ignite Gaming to orchestrate a multi-day esports tournament that captivated gaming enthusiasts. We managed every aspect, from registration and logistics to broadcasting thrilling matches via live streaming. Our targeted digital marketing campaign drove record-breaking viewership and participation.",
            keyAchievement: "Achieved a 300% increase in online viewership compared to the previous year's tournament",
            services: ["Esports Services", "Event Management", "Live Streaming", "Digital Marketing"],
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            title: "Elevate Conference: Hybrid Event Excellence",
            overview: "Transforming a traditional conference into a seamless hybrid experience",
            description: "Gooners Studio was entrusted with transforming a major industry conference into a high-impact hybrid event. We handled the AV production, live streaming to a global audience, and created engaging video content. Our team ensured both in-person and virtual attendees had an exceptional experience.",
            keyAchievement: "Successfully engaged over 5,000 virtual attendees, expanding the event's reach by 60%",
            services: ["Event Management", "Live Streaming", "Media Production"],
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80"
        },
        {
            title: "Bloom Cosmetics: Captivating Product Launch Campaign",
            overview: "Crafting a digital marketing strategy and video content for a product launch",
            description: "Gooners Studio partnered with Bloom Cosmetics to launch their new line of organic skincare products. We produced a series of visually stunning videos and developed a targeted social media campaign to generate buzz. By leveraging influencer marketing, we created high-impact content that resonated with their target audience.",
            keyAchievement: "Achieved a 40% increase in product sales within the first month of the campaign",
            services: ["Media Production", "Digital Marketing", "Content Creation"],
            image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
        },
        {
            title: "TechVision Summit: Global Tech Conference",
            overview: "Organizing a premier technology conference with industry leaders",
            description: "Gooners Studio conceptualized and executed the TechVision Summit, bringing together tech innovators, entrepreneurs, and thought leaders from around the world. We managed everything from venue selection and speaker coordination to technical production and digital engagement strategies.",
            keyAchievement: "Attracted over 2,000 in-person attendees and 15,000 virtual participants from 45 countries",
            services: ["Event Management", "Technical Production", "Digital Strategy", "Content Creation"],
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "Nexus Gaming Platform: UI/UX Redesign",
            overview: "Revitalizing a gaming platform with modern user experience design",
            description: "Gooners Studio collaborated with Nexus Gaming to completely redesign their digital platform. Our team conducted extensive user research, created intuitive navigation systems, and implemented a visually striking interface that significantly enhanced user engagement and retention.",
            keyAchievement: "Increased user session duration by 45% and reduced bounce rate by 30% within three months of launch",
            services: ["UI/UX Design", "User Research", "Web Development", "Analytics"],
            image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
        },
        {
            title: "Velocity Sports: Brand Identity Overhaul",
            overview: "Creating a dynamic new brand identity for a sports apparel company",
            description: "Velocity Sports approached Gooners Studio for a complete brand refresh. We developed a comprehensive brand strategy, designed a bold new visual identity, and created guidelines for consistent implementation across all touchpoints, from packaging to digital presence.",
            keyAchievement: "Brand recognition increased by 65% among target demographic within six months",
            services: ["Brand Strategy", "Visual Identity", "Packaging Design", "Brand Guidelines"],
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "EcoSphere: Environmental Documentary Series",
            overview: "Producing a compelling documentary series on environmental conservation",
            description: "Gooners Studio conceptualized and produced EcoSphere, a five-part documentary series highlighting critical environmental issues and innovative solutions. Our team traveled to multiple locations worldwide, capturing stunning footage and powerful stories that inspired viewers to take action.",
            keyAchievement: "Series was picked up by a major streaming platform and viewed by over 3 million people globally",
            services: ["Video Production", "Storytelling", "Cinematography", "Post-Production"],
            image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "Pulse Music Festival: Immersive Experience Design",
            overview: "Creating an unforgettable multi-sensory music festival experience",
            description: "For the Pulse Music Festival, Gooners Studio designed immersive installations that transformed the venue into an interactive wonderland. We integrated projection mapping, responsive lighting systems, and interactive digital elements that responded to the music and crowd energy.",
            keyAchievement: "Festival hashtag generated over 2 million social media impressions with 98% positive sentiment",
            services: ["Experience Design", "Projection Mapping", "Interactive Installations", "Technical Direction"],
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "FinTech Revolution: Educational Content Series",
            overview: "Developing accessible educational content about financial technology",
            description: "Gooners Studio partnered with a leading financial institution to create an educational content series demystifying fintech concepts for everyday consumers. We produced animated explainer videos, interactive infographics, and engaging social media content that simplified complex topics.",
            keyAchievement: "Content series reached over 5 million viewers and increased the client's customer acquisition by 25%",
            services: ["Content Strategy", "Animation", "Educational Design", "Social Media"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        }
    ];

    // Gallery images data
    const galleryImages = [
        {
            id: 1,
            title: "Esports Tournament Finals",
            category: "Event Photography",
            src: "https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
        },
        {
            id: 2,
            title: "Creative Team Brainstorming",
            category: "Behind the Scenes",
            src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            id: 3,
            title: "Product Launch Event",
            category: "Marketing",
            src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            id: 4,
            title: "Conference Keynote",
            category: "Event Coverage",
            src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            id: 5,
            title: "Studio Production Setup",
            category: "Equipment",
            src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            id: 6,
            title: "Content Creation Session",
            category: "Production",
            src: "https://media.istockphoto.com/id/2151451946/photo/two-joyful-women-hosting-a-live-podcast-session.jpg?s=1024x1024&w=is&k=20&c=1HehYBoReWfBQiCwLzhPdYKJIKYDemQvRWDjrYRLZJA=",
        },
        {
            id: 7,
            title: "Brand Strategy Meeting",
            category: "Planning",
            src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            id: 8,
            title: "Live Streaming Setup",
            category: "Technical",
            src: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
        {
            id: 9,
            title: "Gaming Tournament Arena",
            category: "Venue",
            src: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        },
    ];

    // Animation variants
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
        <main className="min-h-screen bg-background text-foreground">
            {/* Scroll Progress Indicator */}
            <motion.div 
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Theme Toggle Button */}
            <motion.button
                onClick={toggleTheme}
                className="fixed top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring z-50 bg-card text-foreground"
                aria-label={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {darkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>

            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center px-4 py-20 overflow-hidden bg-background">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    <motion.div 
                        className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-30 bg-primary"
                        animate={{
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div 
                        className="absolute bottom-[-50px] left-[-50px] w-[300px] h-[300px] rounded-full opacity-30 bg-accent"
                        animate={{
                            y: [0, 20, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <div className="container mx-auto max-w-6xl z-10">
                    <div className="text-center">
                <motion.h1 
                            className="text-4xl md:text-6xl font-bold mb-4 text-foreground"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                >
                    Our Projects
                </motion.h1>
                        
                        <motion.p
                            className="text-xl md:text-2xl font-medium mb-6 text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        >
                            Transforming Ideas into Digital Reality
                        </motion.p>
                        
                <motion.p 
                            className="max-w-2xl mx-auto text-base md:text-lg mb-10 text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                        >
                            Since our inception, Gooners Studio has evolved from a small creative team to a powerhouse of digital innovation. 
                            Our projects showcase our commitment to excellence, pushing boundaries, and delivering exceptional results 
                            that exceed client expectations. Each project represents our journey of growth and our passion for creating 
                            impactful digital experiences.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section className="py-20 bg-card relative z-0">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-card-foreground"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        Featured Projects
                        <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
                    </motion.h2>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
                        style={{ isolation: 'isolate' }}
                    >
                        {projects.map((project, index) => (
                            <GridCard
                                key={index}
                                className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedProject(index)}
                                variants={fadeInUp}
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-card-foreground">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4">
                                        {project.overview}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.services.slice(0, 3).map((service, idx) => (
                                            <span key={idx} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                                                {service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </GridCard>
                        ))}
                    </motion.div>

                    {/* Project Modal */}
                    {selectedProject !== null && (
                        <ProjectModal
                            isOpen={selectedProject !== null}
                            onClose={() => setSelectedProject(null)}
                            project={projects[selectedProject]}
                        />
                    )}
                </div>
            </section>

            {/* Client Testimonials Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-foreground"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUp}
                >
                        Client Success Stories
                        <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
                    </motion.h2>
                    
                    <motion.div 
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                    <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
                </motion.div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="py-20 bg-card">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-card-foreground"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        Our Project Process
                        <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10" style={{ isolation: 'isolate' }}>
                        <GridCard
                            className="rounded-xl p-8 shadow-lg transition-all duration-300 bg-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                        >
                            <div className="mb-6 w-16 h-16 rounded-full border-2 border-primary bg-transparent flex items-center justify-center text-primary mx-auto">
                                <span className="text-2xl font-bold">01</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center text-card-foreground">Discovery</h3>
                            <p className="text-center text-muted-foreground">
                                We begin by understanding your vision, goals, and target audience to create a strategic roadmap.
                            </p>
                        </GridCard>
                        
                        <GridCard
                            className="rounded-xl p-8 shadow-lg transition-all duration-300 bg-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                        >
                            <div className="mb-6 w-16 h-16 rounded-full border-2 border-primary bg-transparent flex items-center justify-center text-primary mx-auto">
                                <span className="text-2xl font-bold">02</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center text-card-foreground">Design</h3>
                            <p className="text-center text-muted-foreground">
                                Our creative team crafts visually stunning concepts that align with your brand identity.
                            </p>
                        </GridCard>
                        
                        <GridCard
                            className="rounded-xl p-8 shadow-lg transition-all duration-300 bg-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                        >
                            <div className="mb-6 w-16 h-16 rounded-full border-2 border-primary bg-transparent flex items-center justify-center text-primary mx-auto">
                                <span className="text-2xl font-bold">03</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center text-card-foreground">Development</h3>
                            <p className="text-center text-muted-foreground">
                                We bring designs to life with cutting-edge technology and meticulous attention to detail.
                            </p>
                        </GridCard>
                        
                        <GridCard
                            className="rounded-xl p-8 shadow-lg transition-all duration-300 bg-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                        >
                            <div className="mb-6 w-16 h-16 rounded-full border-2 border-primary bg-transparent flex items-center justify-center text-primary mx-auto">
                                <span className="text-2xl font-bold">04</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-center text-card-foreground">Launch & Support</h3>
                            <p className="text-center text-muted-foreground">
                                We ensure a smooth launch and provide ongoing support to maximize your project's success.
                            </p>
                        </GridCard>
                    </div>
                </div>
            </section>

            {/* Image Gallery Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-foreground"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        Project Gallery
                        <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
                    </motion.h2>
                    
                    <motion.div
                        className="text-center mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore our visual journey through {galleryImages.length} captivating moments from our most impactful projects.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
                        style={{ isolation: 'isolate' }}
                    >
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                variants={fadeInUp}
                                className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group"
                                onClick={() => setSelectedImage(index)}
                                whileHover={{ y: -5 }}
                            >
                                <img 
                                    src={image.src} 
                                    alt={image.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <h3 className="text-white font-bold text-xl">{image.title}</h3>
                                    <p className="text-white/80 text-sm">{image.category}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Gallery Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", duration: 0.4 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[90vh]"
                        >
                            <div className="relative">
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="absolute right-4 top-4 p-2 rounded-full bg-black/50 text-white z-10"
                                >
                                    <FaTimes size={20} />
                                </button>
                                
                                <div className="relative">
                                    <img 
                                        src={galleryImages[selectedImage].src} 
                                        alt={galleryImages[selectedImage].title}
                                        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                                    />
                                </div>
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-white font-bold text-2xl">{galleryImages[selectedImage].title}</h3>
                                    <p className="text-white/80">{galleryImages[selectedImage].category}</p>
                                </div>
                                
                                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage((prev) => {
                                                if (prev === null) return 0;
                                                return prev === 0 ? galleryImages.length - 1 : prev - 1;
                                            });
                                        }}
                                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <FaArrowLeft size={20} />
                                    </button>
                                </div>
                                
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage((prev) => {
                                                if (prev === null) return 0;
                                                return prev === galleryImages.length - 1 ? 0 : prev + 1;
                                            });
                                        }}
                                        className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    >
                                        <FaArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* CTA Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 max-w-6xl">
                    <motion.div 
                        className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold mb-6 text-foreground"
                            variants={fadeInUp}
                        >
                            Ready to Start Your Next Project?
                        </motion.h2>
                        <motion.p 
                            className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
                            variants={fadeInUp}
                        >
                            Let's collaborate to bring your vision to life with our expertise in digital innovation.
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                        >
                            <Link href="/contactus">
                                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg">
                                    Get in Touch
                                </button>
                            </Link>
            </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
                    </motion.div>
        </div>
            </section>
        </main>
    );
};

export default Projects;