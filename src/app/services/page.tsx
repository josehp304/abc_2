'use client';

import { FaVideo, FaCamera, FaBullhorn, FaCalendarCheck, FaGamepad } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ThemeToggle from "@/components/theme-toggle";
import { GridCard } from "@/components/ui/grid-card";

interface ServiceFeature {
  id: number;
  title: string;
  url: string;
  icon: ReactNode;
  description: string;
  features: string[];
  gradient: string;
  dotColor: string;
}

interface ServiceCardProps {
  service: ServiceFeature;
  index: number;
}

const services: ServiceFeature[] = [
  {
    id: 1,
    title: 'Live Streaming',
    url:'/live-streaming',
    icon: <FaVideo className="w-16 h-16 text-white" />,
    description: 'Professional live streaming solutions for virtual and hybrid events.',
    features: [
      'High-quality video streams with minimal latency',
      'Multi-platform support (YouTube, Facebook Live, Zoom)',
      'Real-time audience engagement tools',
      'Live chat, Q&A sessions, and polls',
      'Event recording for on-demand viewing'
    ],
    gradient: 'from-purple-600 to-indigo-600',
    dotColor: 'bg-purple-500'
  },
  {
    id: 2,
    title: 'Media Production',
    url:'/media-production',
    icon: <FaCamera className="w-16 h-16 text-white" />,
    description: 'Professional videography, photography, and post-production services.',
    features: [
      'High-quality video production for promotions',
      'Professional event photography',
      'Corporate branding and product showcases',
      'Advanced post-production editing',
      'Color correction and sound design'
    ],
    gradient: 'from-pink-600 to-rose-600',
    dotColor: 'bg-pink-500'
  },
  {
    id: 3,
    title: 'Digital Marketing',
    url:'/digital-marketing',
    icon: <FaBullhorn className="w-16 h-16 text-white" />,
    description: 'Comprehensive digital marketing solutions to grow your online presence.',
    features: [
      'Social media management and strategy',
      'Search engine optimization (SEO)',
      'Targeted ad campaigns',
      'Content strategy and creation',
      'Brand development and management'
    ],
    gradient: 'from-cyan-600 to-blue-600',
    dotColor: 'bg-cyan-500'
  },
  {
    id: 4,
    title: 'Esports & Gaming',
    icon: <FaGamepad className="w-16 h-16 text-white" />,
    url:'/esports-gaming',
    description: 'Complete Esports event management and competitive gaming solutions.',
    features: [
      'Tournament organization and hosting',
      'Professional game streaming and broadcasting',
      'Team management and player development',
      'Gaming content creation and strategy',
      'Sponsorship and brand integration'
    ],
    gradient: 'from-violet-600 to-fuchsia-600',
    dotColor: 'bg-violet-500'
  },
  {
    id: 5,
    title: 'Event Management',
    url:'/event-management',
    icon: <FaCalendarCheck className="w-16 h-16 text-white" />,
    description: 'End-to-end event planning and execution services.',
    features: [
      'Concept development and planning',
      'Logistics and vendor management',
      'On-site coordination',
      'Hybrid event integration',
      'Post-event analysis and reporting'
    ],
    gradient: 'from-emerald-600 to-teal-600',
    dotColor: 'bg-emerald-500'
  },
 
];

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const router = useRouter();

  return (
    <GridCard>
      <motion.div
        onClick={() => router.push(`/services${service.url}`)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2 }}
        className="group relative bg-card dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
        
        <div className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`p-4 rounded-full bg-gradient-to-br ${service.gradient} shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300 hover:rotate-3`}>
              {service.icon}
            </div>
            <h3 className="text-3xl font-bold mt-4 mb-3 text-card-foreground dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
              {service.title}
            </h3>
            <p className="text-lg text-muted-foreground dark:text-gray-300 mb-6 leading-relaxed">
              {service.description}
            </p>
          </div>
          
          <ul className="space-y-4">
            {service.features.map((feature: string, idx: number) => (
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                key={idx}
                className="flex items-center text-muted-foreground dark:text-gray-300 group-hover:transform group-hover:translate-x-2 transition-transform duration-200"
              >
                <span className={`w-2 h-2 rounded-full ${service.dotColor} mr-3 group-hover:scale-150 transition-transform duration-200`}></span>
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </GridCard>
  );
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function ServicesPage() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.1 });

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
            alt="Our Services"
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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 text-primary-foreground"
          >
            Comprehensive solutions tailored to elevate your digital presence and event experiences
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <div className="relative z-10">
        <motion.div 
          className="py-24 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div 
              ref={headerRef}
              className="text-center mb-20"
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold text-primary tracking-wider uppercase mb-4 block">
                What We Offer
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-violet-500 to-primary">
                Explore Our Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Discover how we can help transform your ideas into reality
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const styles = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}
`;