'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaSearch, FaAd, FaInstagram, FaPen, FaEnvelope, FaChartLine, FaCheck, FaClock, FaUsers, FaTrophy, FaQuestionCircle } from 'react-icons/fa';
import ThemeToggle from "@/components/theme-toggle";
import { GridCard } from "@/components/ui/grid-card";
import Link from 'next/link';

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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    client: "Fashion Brand Co.",
    results: "3x social media engagement",
    description: "Strategic social media campaigns drove massive audience growth.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    client: "Service Pro",
    results: "45% increase in leads",
    description: "Integrated digital marketing approach boosted lead generation.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
            alt="Digital Marketing"
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
            Digital Marketing Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 text-primary-foreground"
          >
            Drive growth through strategic digital marketing solutions
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
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
              Our Digital Marketing Services
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Comprehensive digital solutions to grow your online presence
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground ml-4">{service.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <div className="flex items-center text-primary">
                    <FaChartLine className="w-4 h-4 mr-2" />
                    <span className="font-medium">{service.metrics}</span>
                  </div>
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
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
              Our Process
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              A proven approach to digital marketing success
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

      {/* Success Stories Section */}
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
              Success Stories
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Real results for real businesses
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-video overflow-hidden rounded-t-lg"
                >
                  <Image
                    src={story.image}
                    alt={story.client}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{story.client}</h3>
                    <p className="text-white/80">{story.results}</p>
                  </div>
                </motion.div>
                <div className="p-6">
                  <p className="text-muted-foreground">{story.description}</p>
                </div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
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
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground"
            >
              Find answers to common questions about our digital marketing services
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6"
                  onClick={() => setSelectedFaq(selectedFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center cursor-pointer">
                    <h3 className="text-lg font-semibold text-card-foreground">{faq.question}</h3>
                    <FaQuestionCircle className={`text-primary transition-transform duration-300 ${selectedFaq === index ? 'rotate-180' : ''}`} />
                  </div>
                  {selectedFaq === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 text-muted-foreground"
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-card-foreground"
              variants={fadeInUp}
            >
              Ready to Grow Your Online Presence?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Get a free digital marketing audit and strategy consultation
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
