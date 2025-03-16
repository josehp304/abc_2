"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaPalette, FaVideo, FaChevronRight, FaServer, FaMobile, FaChartLine, FaLock, FaRobot, FaBrain } from "react-icons/fa";
import Image from "next/image";
import Head from "next/head";
import ThemeToggle from "@/components/theme-toggle";
import JobApplicationModal from "@/components/ui/job-application-modal";

export default function JoinUsPage() {
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<{id: string, title: string} | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

  // Job listings data
  const jobs = [
    {
      id: "senior-ui-designer",
      title: "Senior UI Designer",
      department: "Design",
      location: "Mumbai, India (Hybrid)",
      type: "Full-time",
      icon: <FaPalette className="w-6 h-6" />,
      description: "Join our creative team to craft beautiful and intuitive user interfaces that delight our clients and their users.",
      requirements: [
        "5+ years of UI/UX design experience",
        "Strong portfolio demonstrating web and mobile design",
        "Proficiency in Figma, Adobe Creative Suite",
        "Experience with design systems and component libraries",
      ],
    },
    {
      id: "frontend-developer",
      title: "Frontend Developer",
      department: "Engineering",
      location: "Bangalore, India (Remote)",
      type: "Full-time",
      icon: <FaCode className="w-6 h-6" />,
      description: "Help us build beautiful, responsive, and performant web applications using modern frontend technologies.",
      requirements: [
        "3+ years of frontend development experience",
        "Expert in React, Next.js, and TypeScript",
        "Strong understanding of web performance and accessibility",
        "Experience with modern CSS and animation libraries",
      ],
    },
    {
      id: "motion-designer",
      title: "Motion Designer",
      department: "Creative",
      location: "Delhi, India (Hybrid)",
      type: "Full-time",
      icon: <FaVideo className="w-6 h-6" />,
      description: "Create engaging motion graphics and animations that bring our clients' brands to life.",
      requirements: [
        "4+ years of motion design experience",
        "Expert in After Effects and Cinema 4D",
        "Strong understanding of animation principles",
        "Experience with character animation a plus",
      ],
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      department: "Engineering",
      location: "Bangalore, India (Hybrid)",
      type: "Full-time",
      icon: <FaServer className="w-6 h-6" />,
      description: "Design and develop scalable backend systems and APIs that power our cutting-edge applications.",
      requirements: [
        "4+ years of backend development experience",
        "Expertise in Node.js, Python, or Java",
        "Experience with microservices architecture",
        "Strong knowledge of database design and optimization",
      ],
    },
    {
      id: "mobile-developer",
      title: "Mobile Developer",
      department: "Engineering",
      location: "Mumbai, India (Remote)",
      type: "Full-time",
      icon: <FaMobile className="w-6 h-6" />,
      description: "Build native mobile applications that provide seamless experiences across iOS and Android platforms.",
      requirements: [
        "3+ years of mobile development experience",
        "Proficiency in React Native or Flutter",
        "Experience with native iOS/Android development",
        "Understanding of mobile UI/UX best practices",
      ],
    },
    {
      id: "digital-marketing-manager",
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Delhi, India (Hybrid)",
      type: "Full-time",
      icon: <FaChartLine className="w-6 h-6" />,
      description: "Lead our digital marketing initiatives to drive growth and enhance our brand presence across digital channels.",
      requirements: [
        "5+ years of digital marketing experience",
        "Expertise in SEO, SEM, and social media marketing",
        "Experience with marketing analytics tools",
        "Strong content strategy skills",
      ],
    },
    {
      id: "security-engineer",
      title: "Security Engineer",
      department: "Engineering",
      location: "Bangalore, India (Hybrid)",
      type: "Full-time",
      icon: <FaLock className="w-6 h-6" />,
      description: "Protect our systems and data by implementing robust security measures and best practices.",
      requirements: [
        "4+ years of security engineering experience",
        "Knowledge of cybersecurity frameworks",
        "Experience with penetration testing",
        "Security certifications (CISSP, CEH, etc.)",
      ],
    },
    {
      id: "ai-engineer",
      title: "AI/ML Engineer",
      department: "Engineering",
      location: "Bangalore, India (Remote)",
      type: "Full-time",
      icon: <FaBrain className="w-6 h-6" />,
      description: "Develop and implement AI/ML solutions to enhance our products and services with intelligent features.",
      requirements: [
        "3+ years of AI/ML development experience",
        "Strong background in Python and ML frameworks",
        "Experience with deep learning and NLP",
        "MS/PhD in Computer Science or related field",
      ],
    },
    {
      id: "automation-engineer",
      title: "Automation Engineer",
      department: "Engineering",
      location: "Delhi, India (Hybrid)",
      type: "Full-time",
      icon: <FaRobot className="w-6 h-6" />,
      description: "Build and maintain automation frameworks to improve our development and deployment processes.",
      requirements: [
        "3+ years of automation experience",
        "Expertise in CI/CD tools and practices",
        "Experience with test automation",
        "Knowledge of containerization and orchestration",
      ],
    },
  ];

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    setSelectedJob({ id: jobId, title: jobTitle });
  };

  const handleApplicationSubmit = async (formData: FormData) => {
    // Here you would typically send the form data to your backend
    console.log("Application submitted:", Object.fromEntries(formData));
    // Add your API call here
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Join Us - ABC Studios</title>
      </Head>
      <main className="min-h-screen bg-background text-foreground">
        <ThemeToggle />

        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
              alt="Team collaboration"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-primary/90" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-primary-foreground"
            >
              Join Our Creative Journey
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 text-primary-foreground"
            >
              Be part of a team that&apos;s shaping the future of digital experiences
            </motion.p>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12 md:mb-16"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
              >
                Open Positions
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
              >
                Join our team of passionate creators and innovators
              </motion.p>
            </motion.div>

            <div className="grid grid -cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeInUp}
                  className={`bg-card rounded-xl p-6 shadow-lg transition-all duration-300 ${
                    activeJobId === job.id ? 'ring-2 ring-ring' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-primary">{job.icon}</div>
                    <span className="text-sm font-medium text-accent-foreground">{job.type}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{job.department} · {job.location}</p>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  
                  {activeJobId === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <h4 className="font-semibold mb-2 text-card-foreground">Requirements:</h4>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="mb-1">{req}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <button 
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                      onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
                    >
                      {activeJobId === job.id ? 'Show Less' : 'Learn More'}
                      <FaChevronRight className={`ml-1 transition-transform ${activeJobId === job.id ? 'rotate-90' : ''}`} />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(job.id, job.title);
                      }}
                      className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Add the JobApplicationModal */}
        <JobApplicationModal
          isOpen={selectedJob !== null}
          onClose={() => setSelectedJob(null)}
          jobTitle={selectedJob?.title || ""}
          onSubmit={handleApplicationSubmit}
        />
      </main>
    </div>
  );
}