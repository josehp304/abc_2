'use client';

import { motion } from 'framer-motion';
import { FaVideo, FaUsers, FaComments, FaCog, FaCheck, FaQuestionCircle } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const features = [
  {
    title: "High-Quality Streaming",
    description: "Broadcast in crystal clear HD/4K quality with professional-grade equipment and encoding.",
    icon: <FaVideo className="w-8 h-8" />,
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    title: "Multi-Platform Support",
    description: "Stream simultaneously to YouTube, Facebook, Twitch, and custom RTMP destinations.",
    icon: <FaUsers className="w-8 h-8" />,
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    title: "Real-Time Engagement",
    description: "Interact with your audience through live chat, polls, and Q&A sessions.",
    icon: <FaComments className="w-8 h-8" />,
    gradient: "from-green-600 to-teal-600"
  },
  {
    title: "24/7 Technical Support",
    description: "Expert team available for immediate assistance and troubleshooting.",
    icon: <FaCog className="w-8 h-8" />,
    gradient: "from-red-600 to-pink-600"
  }
];

const process = [
  {
    step: 1,
    title: "Consultation",
    description: "We discuss your event requirements and design a custom streaming solution."
  },
  {
    step: 2,
    title: "Setup & Testing",
    description: "Professional setup of equipment and thorough testing of all systems."
  },
  {
    step: 3,
    title: "Live Execution",
    description: "Smooth broadcasting with real-time monitoring and support."
  },
  {
    step: 4,
    title: "Post-Event Analytics",
    description: "Detailed reports and recordings for future reference."
  }
];

const testimonials = [
  {
    name: "Tech Conference 2024",
    quote: "Flawless streaming quality for our 3-day virtual conference with over 10,000 attendees.",
    image: "/testimonials/tech-conf.jpg"
  },
  {
    name: "Global Music Festival",
    quote: "ABC Studios helped us reach 1M+ viewers across multiple platforms simultaneously.",
    image: "/testimonials/music-fest.jpg"
  },
  {
    name: "Corporate Summit",
    quote: "Professional team that delivered beyond our expectations. Will definitely work with them again.",
    image: "/testimonials/corporate.jpg"
  }
];

const faqs = [
  {
    question: "Which platforms do you support for live streaming?",
    answer: "We support all major platforms including YouTube, Facebook Live, Twitch, and custom RTMP destinations. Multiple simultaneous streams are also possible."
  },
  {
    question: "How many cameras can be used in a single stream?",
    answer: "We can support up to 8 cameras in a single stream with our multi-camera switching setup. This allows for dynamic and engaging content delivery."
  },
  {
    question: "What internet speed is required for high-quality streaming?",
    answer: "For 1080p streaming, we recommend a minimum upload speed of 10Mbps. We also bring backup internet solutions for critical events."
  },
  {
    question: "Do you provide post-event recordings?",
    answer: "Yes, we provide both raw footage and edited highlights of your stream in multiple formats, suitable for various platforms and purposes."
  }
];

export default function LiveStreamingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section - Updated for better mobile responsiveness */}
      <div className="relative min-h-[100vh] md:h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src="/videos/streaming-bg.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            >
              Seamless Live Streaming
              <br className="hidden sm:block" />
              for Every Event
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto px-4"
            >
              Professional-grade streaming solutions for virtual and hybrid events,
              delivering exceptional quality and engagement.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => router.push('/contact')}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-base sm:text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center">
                Book a Consultation
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
      </div>

      {/* Features Section - Updated for better mobile layout */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-white"
          >
            Why Choose Our Streaming Service?
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Updated for better spacing on mobile */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-white"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="text-4xl sm:text-5xl font-bold text-purple-500 mb-4 group-hover:text-purple-400 transition-colors duration-300">{step.step}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{step.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-purple-500/50" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Updated for better mobile view */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-white"
          >
            Success Stories
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="relative h-40 sm:h-48 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{testimonial.name}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Updated for better mobile interaction */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 text-white"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 text-left flex items-center justify-between text-white hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <span className="font-semibold pr-4">{faq.question}</span>
                  <FaQuestionCircle className={`transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 sm:px-6 pb-4 text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 