'use client';

import { FaVideo, FaCamera, FaBullhorn, FaCalendarCheck, FaGamepad } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useRouter } from 'next/navigation';

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
    <motion.div
      onClick={() => router.push(`/services${service.url}`)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-300`} />
      
      <div className="p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className={`p-4 rounded-full bg-gradient-to-br ${service.gradient} shadow-lg mb-6 transform group-hover:scale-110 transition-transform duration-300 hover:rotate-3`}>
            {service.icon}
          </div>
          <h3 className="text-3xl font-bold mt-4 mb-3 text-gray-800 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
            {service.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
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
              className="flex items-center text-gray-700 dark:text-gray-300 group-hover:transform group-hover:translate-x-2 transition-transform duration-200"
            >
              <span className={`w-2 h-2 rounded-full ${service.dotColor} mr-3 group-hover:scale-150 transition-transform duration-200`}></span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
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
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0  opacity-20" />
      
      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-violet-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

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
              <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase mb-4 block animate-pulse neon-text">
                What We Offer
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 animate-gradient-xy">
                Our Services
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Comprehensive solutions tailored to elevate your digital presence and event experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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