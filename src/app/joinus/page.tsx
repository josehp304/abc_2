"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaPalette, FaVideo, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import Head from "next/head";
import ThemeToggle from "@/components/theme-toggle";

export default function JoinUsPage() {
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
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
  ];

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>Join Us - Gooners Studio</title>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeInUp}
                  className={`bg-card rounded-xl p-6 shadow-lg transition-all duration-300 cursor-pointer ${
                    activeJobId === job.id ? 'ring-2 ring-ring' : ''
                  }`}
                  onClick={() => setActiveJobId(activeJobId === job.id ? null : job.id)}
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
                  
                  <button className="mt-4 inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                    {activeJobId === job.id ? 'Show Less' : 'Learn More'}
                    <FaChevronRight className={`ml-1 transition-transform ${activeJobId === job.id ? 'rotate-90' : ''}`} />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12 md:py-20 bg-card">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center mb-12"
            >
              <motion.h2 
                variants={fadeInUp}
                className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
              >
                Apply Now
              </motion.h2>
              <motion.p 
                variants={fadeInUp}
                className="text-lg text-muted-foreground"
              >
                Take the first step towards your next great opportunity
              </motion.p>
            </motion.div>

            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border bg-background text-foreground border-input focus:ring-2 focus:ring-ring focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border bg-background text-foreground border-input focus:ring-2 focus:ring-ring focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border bg-background text-foreground border-input focus:ring-2 focus:ring-ring focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-card-foreground mb-2">Position</label>
                  <select
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border bg-background text-foreground border-input focus:ring-2 focus:ring-ring focus:outline-none"
                    required
                  >
                    <option value="">Select a position</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">Cover Letter</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border bg-background text-foreground border-input focus:ring-2 focus:ring-ring focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="resume" className="block text-sm font-medium text-card-foreground mb-2">Resume/CV</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-2 rounded-lg border bg-background text-foreground border-input focus:ring-2 focus:ring-ring focus:outline-none"
                  required
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium shadow-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  Submit Application
                </button>
              </div>
            </motion.form>
          </div>
        </section>
      </main>
    </div>
  );
}