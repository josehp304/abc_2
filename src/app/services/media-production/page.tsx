'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaVideo, FaCamera, FaEdit, FaMagic, FaPalette, FaFilm, FaPhotoVideo, FaLightbulb, FaCheck, FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import ThemeToggle from "@/components/theme-toggle";
import { GridCard } from "@/components/ui/grid-card";
import Link from 'next/link';

const features = [
  {
    title: "Professional Cinematography",
    description: "Capture stunning visuals with our state-of-the-art cameras and expert cinematographers.",
    icon: <FaVideo className="w-8 h-8" />,
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    title: "Creative Editing",
    description: "Transform raw footage into compelling stories with advanced post-production techniques.",
    icon: <FaEdit className="w-8 h-8" />,
    gradient: "from-purple-600 to-pink-600"
  },
  {
    title: "Photography Excellence",
    description: "Capture perfect moments with our professional photography services.",
    icon: <FaCamera className="w-8 h-8" />,
    gradient: "from-orange-600 to-red-600"
  },
  {
    title: "Studio Production",
    description: "Access our fully-equipped studio for professional shoots and recordings.",
    icon: <FaFilm className="w-8 h-8" />,
    gradient: "from-green-600 to-teal-600"
  }
];

const services = [
  {
    category: "Videography",
    items: [
      "Corporate Videos & Commercials",
      "Event Coverage",
      "Product Demonstrations",
      "Aerial Videography",
      "Training Videos"
    ],
    icon: <FaVideo className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    category: "Photography",
    items: [
      "Product Photography",
      "Corporate Headshots",
      "Event Photography",
      "Architectural Shots",
      "Fashion Photography"
    ],
    icon: <FaCamera className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    category: "Post-Production",
    items: [
      "Video Editing",
      "Color Grading",
      "Motion Graphics",
      "Sound Design",
      "Visual Effects"
    ],
    icon: <FaMagic className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    category: "Live Production",
    items: [
      "Multi-Camera Setup",
      "Live Streaming",
      "Real-time Graphics",
      "Live Switching",
      "Event Broadcasting"
    ],
    icon: <FaPhotoVideo className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1505673542670-a5e3ff5b14a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];

const process = [
  {
    step: 1,
    title: "Pre-Production",
    description: "We plan every detail of your project, from concept to execution.",
    icon: <FaLightbulb className="w-8 h-8" />
  },
  {
    step: 2,
    title: "Production",
    description: "Professional filming with state-of-the-art equipment and expertise.",
    icon: <FaFilm className="w-8 h-8" />
  },
  {
    step: 3,
    title: "Post-Production",
    description: "Meticulous editing and enhancement of your content.",
    icon: <FaEdit className="w-8 h-8" />
  },
  {
    step: 4,
    title: "Delivery",
    description: "Final review and delivery of your polished content.",
    icon: <FaCheck className="w-8 h-8" />
  }
];

const portfolio = [
  {
    title: "Brand Commercial",
    client: "TechCorp International",
    description: "A cinematic commercial showcasing product innovation",
    image: "https://images.unsplash.com/photo-1523395175685-d5f3f4f88f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    metrics: "2M+ views across platforms"
  },
  {
    title: "Corporate Event",
    client: "Global Summit 2024",
    description: "Complete event coverage and highlight reel",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    metrics: "Live streamed to 50K+ viewers"
  },
  {
    title: "Product Launch",
    client: "NextGen Devices",
    description: "Product showcase with stunning visuals",
    image: "https://images.unsplash.com/photo-1603574670812-d24560880210?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    metrics: "300% increase in product interest"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    quote: "ABC Studios transformed our vision into reality with exceptional quality.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Michael Chen",
    role: "Event Manager",
    company: "Global Events",
    quote: "Their attention to detail and creativity exceeded our expectations.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

export default function MediaProductionPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const portfolioRef = useRef<HTMLElement>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Media Production"
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
            Media Production Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 text-primary-foreground"
          >
            Professional media production services that transform your vision into stunning reality
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
            >
              Our Production Services
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Comprehensive media solutions for every creative need
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground ml-4">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            >
              Our Expertise
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Discover our range of professional media services
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-video overflow-hidden rounded-t-lg"
                >
                  <Image
                    src={service.image}
                    alt={service.category}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.category}</h3>
                  </div>
                </motion.div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground ml-3">{service.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <FaCheck className="w-4 h-4 text-primary mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
            >
              Our Process
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              A proven approach to delivering exceptional media content
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 h-full relative"
                >
                  <div className="text-4xl font-bold text-primary mb-4">{step.step}</div>
                  <div className="mb-4 text-primary">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/50" />
                  )}
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Explore our latest work and success stories
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-video overflow-hidden rounded-t-lg"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80">{project.client}</p>
                  </div>
                </motion.div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-2">{project.description}</p>
                  <p className="text-primary font-medium">{project.metrics}</p>
                </div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-4 text-card-foreground"
            >
              Client Testimonials
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              What our clients say about our work
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-card-foreground">{testimonial.name}</h3>
                      <p className="text-primary">{testimonial.role}</p>
                      <p className="text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Start Your Project?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Let's create something amazing together
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contactus">
                <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg">
                  Get Started
                </button>
              </Link>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
