'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  FaMicrophone, FaRing, FaMusic, FaTrophy, FaVideo, 
  FaCheck, FaClock, FaUsers, FaStar, FaQuestionCircle 
} from 'react-icons/fa';

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
            <source src="/videos/events.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
          >
            Flawless Event Planning & Execution
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              for Every Occasion
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            From intimate gatherings to grand celebrations, we bring your vision to life
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={scrollToContact}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Plan Your Event Now
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
            Our Event Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedService(selectedService === index ? null : index)}
                className="group cursor-pointer bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center text-white">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center mr-4`}>
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-semibold">{service.title}</h3>
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
                      <p className="text-gray-300 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center text-gray-400"
                          >
                            <FaCheck className="w-4 h-4 text-purple-500 mr-2" />
                            {feature}
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
      <section className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            How We Work
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

      {/* Featured Events */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-center mb-16 text-white"
          >
            Featured Events
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
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
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-purple-400 mb-2">{event.type}</p>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                  <p className="text-sm text-gray-500">{event.metrics}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-800/30">
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
                    <div className="flex mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 w-4 h-4" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
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
                  <FaQuestionCircle className={`transform transition-transform duration-300 ${
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
      <section ref={contactRef} className="py-20 px-4 bg-gray-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold mb-8 text-white"
          >
            Ready to Create an Unforgettable Event?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-12"
          >
            Let's bring your vision to life. Contact us for a free consultation.
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
