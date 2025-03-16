"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSun, FaMoon, FaPlay, FaQuoteLeft, FaAward, FaUsers, FaLightbulb, FaHeart, FaTrophy, FaLinkedin, FaBehance, FaGithub } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import ProjectModal from "@/components/magicui/project-modal";

export default function AboutPage() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const statsRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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

      // Check if stats section is visible
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setStatsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-play/pause video when in viewport
  useEffect(() => {
    if (!videoRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVideoPlaying) {
          videoRef.current?.play().catch(e => console.error("Video play failed:", e));
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(videoRef.current);
    
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [isVideoPlaying]);

  // Types for stats data
  interface StatCounterProps {
    end: number;
    prefix?: string;
    suffix?: string;
  }

  // Stats data with animated counters
  const StatCounter: React.FC<StatCounterProps> = ({ end, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<number | null>(null);

    useEffect(() => {
      if (statsVisible && count !== end) {
        const startTime = Date.now();
        const duration = 2000;
        const startValue = count;

        const updateCount = () => {
          const currentTime = Date.now();
          const progress = Math.min((currentTime - startTime) / duration, 1);
          
          if (progress < 1) {
            setCount(Math.floor(startValue + (end - startValue) * progress));
            countRef.current = requestAnimationFrame(updateCount);
          } else {
            setCount(end);
          }
        };

        countRef.current = requestAnimationFrame(updateCount);
        return () => {
          if (countRef.current) {
            cancelAnimationFrame(countRef.current);
          }
        };
      }
    }, [end, count, statsVisible]);

    return (
      <span>{prefix}{count}{suffix}</span>
    );
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
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

  // Company timeline data
  const timelineData = [
    { year: "2010", title: "Studio Launch", description: "ABC Studio was born with a vision to create groundbreaking digital experiences." },
    { year: "2013", title: "Creative Excellence", description: "Delivered award-winning projects for global brands, setting new industry standards." },
    { year: "2016", title: "Global Reach", description: "Expanded our creative footprint across continents, bringing innovation worldwide." },
    { year: "2019", title: "Digital Revolution", description: "Pioneered immersive AR/VR experiences and interactive digital solutions." },
    { year: "2022", title: "Future Forward", description: "Embracing AI and sustainable design practices for next-generation creativity." }
  ];

  // Team members data with updated roles for a creative studio
  const teamMembers = [
    { 
      name: "Iman Gandzi", 
      role: "Shopify digital marketing head", 
      bio: "Our best employee who helped multiple clients to become millionair", 
      image: "/images/iman.jpg", 
      social: [
        { url: "https://www.linkedin.com", icon: <FaLinkedin size={18} /> },
        { url: "https://www.behance.net", icon: <FaBehance size={18} /> }
      ]
    },
    { 
      name: "Andrew", 
      role: "Director", 
      bio: "Directed Award-winning filims like matrix .", 
      image: "/images/andrew.jpg", 
      social: [
        { url: "https://www.linkedin.com", icon: <FaLinkedin size={18} /> },
        { url: "https://www.behance.net", icon: <FaBehance size={18} /> }
      ]
    },
    { 
      name: "Tfue", 
      role: "Fortnight & streaming coach", 
      bio: "washed fortnight player", 
      image: "/images/tfue.jpg", 
      social: [
        { url: "https://www.linkedin.com", icon: <FaLinkedin size={18} /> },
        { url: "https://www.github.com", icon: <FaGithub size={18} /> }
      ]
    },
    { 
      name: "Abebayo", 
      role: "content generation head", 
      bio: "nigerian prince.", 
      image: "/images/randomnig.jpeg", 
      social: [
        { url: "https://www.linkedin.com", icon: <FaLinkedin size={18} /> },
        { url: "https://www.behance.net", icon: <FaBehance size={18} /> }
      ]
    }
  ];

  // Testimonials data
  const testimonials = [
    { 
      text: "ABC Studio transformed our brand with their exceptional creative vision. Their ability to blend artistry with technology is unmatched in the industry.", 
      author: "Ananya Desai, Creative Head at TechVision",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    { 
      text: "Working with ABC Studio was transformative. They don't just create content; they craft experiences that leave lasting impressions.", 
      author: "Vikram Malhotra, CEO of Digital Dynamics",
      image: "https://images.unsplash.com/photo-1472099645785-4d0ef436c909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Timeline events data
  const timelineEvents = [
    { year: "2010", description: "ABC Studio was founded with a vision to create innovative digital experiences." },
    { year: "2012", description: "We delivered our first award-winning project, setting the tone for our future success." },
    { year: "2015", description: "Our team expanded to include talented individuals from diverse creative backgrounds." },
    { year: "2018", description: "We pioneered the use of AR/VR technology in our projects, pushing the boundaries of digital innovation." },
    { year: "2020", description: "We achieved a major milestone, completing 100 projects and solidifying our position as industry leaders." },
    { year: "2022", description: "We continued to innovate, incorporating AI and sustainable design practices into our work." }
  ];

  // Project data
  const projects = [
    {
      title: "Ignite Esports Tournament",
      overview: "A comprehensive esports tournament management solution",
      description: "ABC Studios partnered with Ignite Gaming to orchestrate a multi-day esports tournament that captivated gaming enthusiasts. We managed every aspect, from registration and logistics to broadcasting thrilling matches via live streaming. Our targeted digital marketing campaign drove record-breaking viewership and participation.",
      keyAchievement: "Achieved a 300% increase in online viewership compared to the previous year's tournament",
      services: ["Esports Services", "Event Management", "Live Streaming", "Digital Marketing"],
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Elevate Conference",
      overview: "Transforming a traditional conference into a seamless hybrid experience",
      description: "ABC Studios was entrusted with transforming a major industry conference into a high-impact hybrid event. We handled the AV production, live streaming to a global audience, and created engaging video content. Our team ensured both in-person and virtual attendees had an exceptional experience.",
      keyAchievement: "Successfully engaged over 5,000 virtual attendees, expanding the event's reach by 60%",
      services: ["Event Management", "Live Streaming", "Media Production"],
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80"
    },
    {
      title: "Bloom Cosmetics Launch",
      overview: "Crafting a digital marketing strategy and video content for a product launch",
      description: "ABC Studios partnered with Bloom Cosmetics to launch their new line of organic skincare products. We produced a series of visually stunning videos and developed a targeted social media campaign to generate buzz. By leveraging influencer marketing, we created high-impact content that resonated with their target audience.",
      keyAchievement: "Achieved a 40% increase in product sales within the first month of the campaign",
      services: ["Media Production", "Digital Marketing", "Content Creation"],
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80"
    }
  ];

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
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
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
              Crafting Digital Magic
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl font-medium mb-6 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Where Creativity Meets Innovation
            </motion.p>
            
            <motion.p
              className="max-w-2xl mx-auto text-base md:text-lg mb-10 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              At ABC Studio, we transform ideas into captivating digital experiences. Our passion for creativity drives us to push boundaries and redefine what&apos;s possible in the digital realm.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Reel Section */}
      <section className="w-full flex items-center justify-center py-20 bg-card">
     
        <HeroVideoDialog  className="z-[1000] max-w-[600px]"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/xvFZjo5PgG0?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=xvFZjo5PgG0"
        thumbnailSrc="/images/tn.jpg"
        thumbnailAlt="Hero Video" />
         
      </section>

      {/* Our Story Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Our Journey
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
          </motion.h2>
          
          <div className="relative mt-20 pb-10">
            {/* Timeline center line - hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 rounded-full" />
            
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                className={`relative flex flex-col md:flex-row mb-16 md:mb-10 items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Year Circle */}
                <div className="z-10 w-16 h-16 rounded-full flex items-center justify-center border-2 border-primary text-foreground font-bold shadow-lg mb-4 md:mb-0 bg-background">
                  {event.year}
                </div>
                
                {/* Timeline Content */}
                <div 
                  className={`w-full md:w-5/12 px-4 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                  }`}
                >
                  <motion.div 
                    className={`p-6 rounded-xl shadow-lg bg-card`}
                    whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
                  >
                    <p className="text-base md:text-lg text-muted-foreground">
                      {event.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-card-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Our Philosophy
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            <motion.div
              className="rounded-xl p-8 shadow-lg transition-all duration-300 bg-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="mb-6 w-16 h-16 rounded-full border-2 border-primary bg-transparent flex items-center justify-center text-primary mx-auto">
                <FaLightbulb size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-card-foreground">Our Mission</h3>
              <p className="text-center md:max-w-md mx-auto text-muted-foreground">
                To create digital experiences that transform brands and empower businesses to connect with their audiences in meaningful and innovative ways.
              </p>
            </motion.div>
            
            <motion.div
              className="rounded-xl p-8 shadow-lg transition-all duration-300 bg-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="mb-6 w-16 h-16 rounded-full border-2 border-primary bg-transparent flex items-center justify-center text-primary mx-auto">
                <FaUsers size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-card-foreground">Our Vision</h3>
              <p className="text-center md:max-w-md mx-auto text-muted-foreground">
                To be a global leader in creative digital solutions, setting new standards of excellence through innovation, artistry, and technology.
              </p>
            </motion.div>
            
            <motion.div
              className="rounded-xl p-8 shadow-lg transition-all duration-300 bg-card lg:col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="mb-6 w-16 h-16 rounded-full border-2 border-primary bg-transparent flex items-center justify-center text-primary mx-auto">
                <FaHeart size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-center text-card-foreground">Our Values</h3>
              <p className="text-center md:max-w-md mx-auto text-muted-foreground">
                Innovation, Excellence, Integrity, Collaboration, and Client Success guide everything we do at ABC Studio.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="relative py-20 bg-primary overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate={statsVisible ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Projects Completed */}
            <motion.div 
              variants={fadeInUp}
              className="bg-card text-card-foreground rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                <StatCounter end={84} />+
              </div>
              <p className="text-muted-foreground text-lg">Projects Completed</p>
            </motion.div>

            {/* Awards Won */}
            <motion.div 
              variants={fadeInUp}
              className="bg-card text-card-foreground rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                <StatCounter end={33} />+
              </div>
              <p className="text-muted-foreground text-lg">Awards Won</p>
            </motion.div>

            {/* Team Members */}
            <motion.div 
              variants={fadeInUp}
              className="bg-card text-card-foreground rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                <StatCounter end={17} />+
              </div>
              <p className="text-muted-foreground text-lg">Team Members</p>
            </motion.div>

            {/* Client Satisfaction */}
            <motion.div 
              variants={fadeInUp}
              className="bg-card text-card-foreground rounded-2xl p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-4xl font-bold mb-2">
                <StatCounter end={98} suffix="%" />
              </div>
              <p className="text-muted-foreground text-lg">Client Satisfaction</p>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-48 h-48 bg-accent/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            Our Projects
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(index)}
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
              </motion.div>
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

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
            >
              Meet Our Creative Minds
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Passionate innovators dedicated to transforming ideas into extraordinary digital experiences
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-card text-card-foreground rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-2 text-card-foreground">{member.name}</h3>
                  <p className="text-accent-foreground font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    {member.social.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.url}
                        target="_blank"
                        className="text-muted-foreground hover:text-accent-foreground transition-colors"
                      >
                        {link.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16 relative inline-block left-1/2 transform -translate-x-1/2 text-card-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            What Clients Say
            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary"></span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="rounded-xl p-8 shadow-lg bg-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <p className="text-base md:text-lg text-muted-foreground">{testimonial.text}</p>
                <p className="text-accent-foreground font-medium mt-2">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}