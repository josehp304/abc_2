'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaVideo, FaCamera, FaEdit, FaMagic, FaPalette, FaFilm, FaPhotoVideo, FaLightbulb, FaCheck } from 'react-icons/fa';

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
    image: "/media/videography.jpg"
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
    image: "/media/photography.jpg"
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
    image: "/media/post-production.jpg"
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
    image: "/media/live-production.jpg"
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
    image: "/portfolio/commercial.jpg",
    metrics: "2M+ views across platforms"
  },
  {
    title: "Corporate Event",
    client: "Global Summit 2024",
    description: "Complete event coverage and highlight reel",
    image: "/portfolio/event.jpg",
    metrics: "Live streamed to 50K+ viewers"
  },
  {
    title: "Product Launch",
    client: "NextGen Devices",
    description: "Product showcase with stunning visuals",
    image: "/portfolio/product.jpg",
    metrics: "300% increase in product interest"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    quote: "ABC Studios transformed our vision into reality with exceptional quality.",
    image: "/testimonials/client1.jpg"
  },
  {
    name: "Michael Chen",
    role: "Event Manager",
    company: "Global Events",
    quote: "Their attention to detail and creativity exceeded our expectations.",
    image: "/testimonials/client2.jpg"
  }
];

export default function MediaProductionPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const portfolioRef = useRef<HTMLElement>(null);

  // Scroll to portfolio section
  const scrollToPortfolio = () => {
    portfolioRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section - Updated with parallax effect */}
      <div className="relative min-h-[100vh] md:h-screen">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/videos/media-production.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900">
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-purple-500/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              Bringing Stories to Life
              <br />
              Through Visual Excellence
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto px-4"
            >
              Professional media production services that transform your vision into stunning reality.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={scrollToPortfolio}
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center">
                Explore Our Work
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Why Choose Our Media Production?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Our Media Production Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
                className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.category}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center text-white">
                      <span className="mr-3">{service.icon}</span>
                      <h3 className="text-2xl font-semibold">{service.category}</h3>
                    </div>
                  </div>
                </div>
                
                <AnimatePresence>
                  {selectedService === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <ul className="space-y-3">
                        {service.items.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-gray-300"
                          >
                            <FaCheck className="w-4 h-4 text-purple-500 mr-3" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Our Production Process
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 group hover:border-purple-500/50 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors duration-300">
                    {step.icon}
                  </div>
                  <div className="text-4xl font-bold text-purple-500 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-purple-500/50" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-purple-400 mb-2">{project.client}</p>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <p className="text-sm text-gray-500">{project.metrics}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Client Testimonials
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-purple-400">{testimonial.role}</p>
                    <p className="text-gray-400">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Contact CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-gray-900/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-8 text-white"
          >
            Ready to Start Your Project?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            Let's create something amazing together. Contact us for a free consultation.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => router.push('/contact')}
            className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Contact Us
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
