'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  FaMicrophone, FaRing, FaMusic, FaTrophy, FaVideo, 
  FaCheck, FaClock, FaUsers, FaStar, FaQuestionCircle, FaTimes 
} from 'react-icons/fa';
import ThemeToggle from "@/components/theme-toggle";
import { GridCard } from "@/components/ui/grid-card";
import Link from 'next/link';

const eventServices = [
  {
    title: "Corporate Events",
    description: "Business conferences, product launches, networking events, and seminars.",
    icon: <FaMicrophone className="w-8 h-8" />,
    gradient: "from-blue-600 to-cyan-600",
    image: "/events/corporate.jpg",
    features: [
      "Full conference management",
      "Product launch coordination",
      "Networking event setup",
      "Corporate seminars"
    ]
  },
  {
    title: "Weddings & Celebrations",
    description: "Full wedding planning, engagement parties, and milestone celebrations.",
    icon: <FaRing className="w-8 h-8" />,
    gradient: "from-pink-600 to-rose-600",
    image: "/events/wedding.jpg",
    features: [
      "Complete wedding planning",
      "Venue decoration",
      "Vendor coordination",
      "Timeline management"
    ]
  },
  {
    title: "Concerts & Live Shows",
    description: "Organizing live music concerts, artist management, and backstage coordination.",
    icon: <FaMusic className="w-8 h-8" />,
    gradient: "from-purple-600 to-indigo-600",
    image: "/events/concert.jpg",
    features: [
      "Artist management",
      "Stage production",
      "Sound & lighting",
      "Ticket management"
    ]
  },
  {
    title: "Award Shows & Galas",
    description: "Managing red carpet events, celebrity appearances, and VIP guest handling.",
    icon: <FaTrophy className="w-8 h-8" />,
    gradient: "from-amber-600 to-orange-600",
    image: "/events/awards.jpg",
    features: [
      "Red carpet setup",
      "VIP management",
      "Celebrity coordination",
      "Media handling"
    ]
  },
  {
    title: "Hybrid & Virtual Events",
    description: "End-to-end event streaming, webinar management, and online audience engagement.",
    icon: <FaVideo className="w-8 h-8" />,
    gradient: "from-green-600 to-teal-600",
    image: "/events/virtual.jpg",
    features: [
      "Live streaming setup",
      "Virtual platform management",
      "Online engagement tools",
      "Technical support"
    ]
  }
];

const process = [
  {
    step: 1,
    title: "Consultation & Planning",
    description: "Understanding your vision and creating a detailed event blueprint.",
    icon: <FaUsers className="w-8 h-8" />
  },
  {
    step: 2,
    title: "Venue & Logistics",
    description: "Securing the perfect venue and managing all logistics.",
    icon: <FaClock className="w-8 h-8" />
  },
  {
    step: 3,
    title: "Production & Setup",
    description: "Coordinating vendors and creating the perfect ambiance.",
    icon: <FaCheck className="w-8 h-8" />
  },
  {
    step: 4,
    title: "Event Execution",
    description: "Ensuring flawless execution and guest satisfaction.",
    icon: <FaStar className="w-8 h-8" />
  }
];

const featuredEvents = [
  {
    title: "Tech Summit 2024",
    type: "Corporate Conference",
    metrics: "2000+ Attendees",
    description: "A three-day technology conference with keynote speakers and workshops.",
    image: "/events/tech-summit.jpg"
  },
  {
    title: "Royal Wedding",
    type: "Luxury Wedding",
    metrics: "500 Guests",
    description: "An elegant destination wedding with intricate details and coordination.",
    image: "/events/wedding-featured.jpg"
  },
  {
    title: "Music Festival",
    type: "Concert Series",
    metrics: "10,000+ Attendees",
    description: "A two-day music festival featuring multiple artists and stages.",
    image: "/events/festival.jpg"
  }
];

const testimonials = [
  {
    name: "John Smith",
    role: "CEO",
    company: "Tech Innovations",
    quote: "ABC Studios delivered an exceptional conference experience. Every detail was perfect.",
    image: "/testimonials/john.jpg",
    rating: 5
  },
  {
    name: "Sarah & Mike",
    role: "Newlyweds",
    company: "Dream Wedding",
    quote: "Our wedding was absolutely magical. They took care of everything!",
    image: "/testimonials/wedding-couple.jpg",
    rating: 5
  }
];

const faqs = [
  {
    question: "What types of events do you specialize in?",
    answer: "We specialize in corporate events, weddings, concerts, award shows, and virtual events. Our team has extensive experience in managing events of all sizes."
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 3-6 months in advance for large events, though we can accommodate shorter timelines when needed."
  },
  {
    question: "Do you handle virtual and hybrid events?",
    answer: "Yes! We offer comprehensive virtual and hybrid event solutions with state-of-the-art streaming technology and engagement tools."
  }
];

export default function EventManagementPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);
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
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Event Management"
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
            Event Management Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 text-primary-foreground"
          >
            Creating unforgettable experiences through flawless event planning and execution
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
              Our Event Services
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Comprehensive event solutions for every occasion
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventServices.map((service, index) => (
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
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                    <p className="text-white/80">{service.description}</p>
                  </div>
                </motion.div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white`}>
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground ml-4">{service.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-muted-foreground">
                        <FaCheck className="w-4 h-4 text-primary mr-2" />
                        {feature}
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
              Our Event Process
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              A streamlined approach to deliver exceptional events
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

      {/* Featured Events Section */}
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
              Featured Events
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Showcasing our most memorable events
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-video overflow-hidden rounded-t-lg"
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                    <p className="text-white/80">{event.type}</p>
                  </div>
                </motion.div>
                <div className="p-6">
                  <p className="text-muted-foreground mb-2">{event.description}</p>
                  <p className="text-primary font-semibold">{event.metrics}</p>
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
              Find answers to common questions about our event services
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
              Ready to Plan Your Event?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Let's create an unforgettable experience together
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
