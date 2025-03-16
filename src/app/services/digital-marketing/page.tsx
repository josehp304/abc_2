'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSearch, FaAd, FaInstagram, FaPen, FaEnvelope, FaChartLine, FaCheck, FaClock, FaUsers, FaTrophy } from 'react-icons/fa';

const services = [
  {
    title: "Search Engine Optimization",
    description: "Improve website rankings and increase organic traffic through data-driven SEO strategies.",
    icon: <FaSearch className="w-8 h-8" />,
    gradient: "from-blue-600 to-cyan-600",
    metrics: "Average 200% traffic increase in 6 months"
  },
  {
    title: "Paid Advertising",
    description: "Strategic PPC campaigns across Google, Facebook, and Instagram to maximize ROI.",
    icon: <FaAd className="w-8 h-8" />,
    gradient: "from-purple-600 to-pink-600",
    metrics: "30% lower customer acquisition cost"
  },
  {
    title: "Social Media Management",
    description: "Engaging content creation and community management across all platforms.",
    icon: <FaInstagram className="w-8 h-8" />,
    gradient: "from-orange-600 to-red-600",
    metrics: "500% increase in social engagement"
  },
  {
    title: "Content Marketing",
    description: "Compelling content that attracts, educates, and converts your target audience.",
    icon: <FaPen className="w-8 h-8" />,
    gradient: "from-green-600 to-teal-600",
    metrics: "40% increase in lead generation"
  },
  {
    title: "Email Marketing",
    description: "Automated email campaigns that nurture leads and drive conversions.",
    icon: <FaEnvelope className="w-8 h-8" />,
    gradient: "from-violet-600 to-indigo-600",
    metrics: "25% higher email open rates"
  },
  {
    title: "Analytics & Tracking",
    description: "Comprehensive performance tracking and optimization strategies.",
    icon: <FaChartLine className="w-8 h-8" />,
    gradient: "from-pink-600 to-rose-600",
    metrics: "Data-driven decisions for better ROI"
  }
];

const process = [
  {
    step: 1,
    title: "Consultation & Goal Setting",
    description: "We analyze your needs and set clear, measurable objectives.",
    icon: <FaUsers className="w-8 h-8" />
  },
  {
    step: 2,
    title: "Strategy Development",
    description: "Custom digital marketing strategy tailored to your goals.",
    icon: <FaChartLine className="w-8 h-8" />
  },
  {
    step: 3,
    title: "Implementation",
    description: "Execute campaigns across chosen digital channels.",
    icon: <FaCheck className="w-8 h-8" />
  },
  {
    step: 4,
    title: "Monitor & Optimize",
    description: "Continuous tracking and optimization for best results.",
    icon: <FaClock className="w-8 h-8" />
  }
];

const successStories = [
  {
    client: "TechStart Inc.",
    results: "500% increase in organic traffic",
    description: "Comprehensive SEO and content strategy transformed their online presence.",
    image: "/case-studies/tech-start.jpg"
  },
  {
    client: "Fashion Brand Co.",
    results: "3x social media engagement",
    description: "Strategic social media campaigns drove massive audience growth.",
    image: "/case-studies/fashion-brand.jpg"
  },
  {
    client: "Service Pro",
    results: "45% increase in leads",
    description: "Integrated digital marketing approach boosted lead generation.",
    image: "/case-studies/service-pro.jpg"
  }
];

const faqs = [
  {
    question: "How long does it take to see results from SEO?",
    answer: "While initial improvements can be seen in 3-6 months, sustainable SEO results typically take 6-12 months to achieve. We focus on both quick wins and long-term strategies."
  },
  {
    question: "What's the minimum budget for paid advertising?",
    answer: "We recommend a minimum monthly ad spend of ₹50,000 to see meaningful results, plus our management fee. The exact budget depends on your industry and goals."
  },
  {
    question: "How do you measure success?",
    answer: "We track key metrics including traffic, conversions, engagement rates, and ROI. Monthly reports detail all KPIs and achievements."
  }
];

export default function DigitalMarketingPage() {
  const router = useRouter();
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative min-h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/videos/digital-marketing.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
          >
            Maximize Your Online Presence
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              with Expert Digital Marketing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Drive growth through strategic SEO, paid advertising, and social media management
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Get a Free Digital Audit
          </motion.button>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Our Digital Marketing Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <p className="text-sm text-purple-400">{service.metrics}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Our Process
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
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700">
                  <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
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

      {/* Success Stories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Success Stories
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.client}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{story.client}</h3>
                  <p className="text-purple-400 mb-2">{story.results}</p>
                  <p className="text-gray-400">{story.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
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
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-white"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <FaChartLine className={`transform transition-transform duration-300 ${
                    selectedFaq === index ? 'rotate-180' : ''
                  }`} />
                </button>
                <AnimatePresence>
                  {selectedFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section ref={contactRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-8 text-white"
          >
            Ready to Transform Your Digital Presence?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            Let's create a customized digital marketing strategy for your business.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={() => router.push('/contact')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us Now
          </motion.button>
        </div>
      </section>
    </div>
  );
}
