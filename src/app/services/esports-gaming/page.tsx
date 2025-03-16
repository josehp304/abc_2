'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaTrophy, FaTwitch, FaUsers, FaTimes, FaCalendar, FaClock, FaRupeeSign, FaMinus, FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useRef, ReactNode } from 'react';
import { SiTwitch as SiTwitchIcon, SiYoutubegaming, SiEpicgames } from 'react-icons/si';
import { GiTrophyCup, GiGamepadCross } from 'react-icons/gi';

interface Tournament {
  id: number;
  title: string;
  game: string;
  registrationFee: number;
  duration: string;
  date: string;
  description: string;
  prizePool: string;
  maxTeams: number;
  currentRegistrations: number;
  gameImage: string;
  requirements: string[];
}

interface EsportsStat {
  value: string;
  label: string;
  icon: ReactNode;
}

interface RegistrationForm {
  teamName: string;
  numberOfTeams: number;
  captainName: string;
  email: string;
  phone: string;
  agreeToTerms: boolean;
}

const statistics: EsportsStat[] = [
  {
    value: "500+",
    label: "Tournaments Hosted",
    icon: <GiTrophyCup className="w-8 h-8" />
  },
  {
    value: "1M+",
    label: "Total Prize Pool",
    icon: <FaRupeeSign className="w-8 h-8" />
  },
  {
    value: "50K+",
    label: "Active Players",
    icon: <FaUsers className="w-8 h-8" />
  },
  {
    value: "100M+",
    label: "Views Generated",
    icon: <SiTwitchIcon className="w-8 h-8" />
  }
];

const tournaments: Tournament[] = [
  {
    id: 1,
    title: "VALORANT Champions Tour 2024",
    game: "VALORANT",
    registrationFee: 1500,
    duration: "3 Days",
    date: "July 15-17, 2024",
    description: "Join the biggest VALORANT tournament in Asia. Compete against top-tier teams in intense 5v5 tactical gameplay. Featuring professional casting and live streaming.",
    prizePool: "₹5,00,000",
    maxTeams: 32,
    currentRegistrations: 24,
    gameImage: "/valorant-banner.jpg",
    requirements: ["5 players + 1 substitute", "Minimum rank: Immortal", "Discord required", "Valid ID proof"]
  },
  {
    id: 2,
    title: "BGMI Pro League Season 5",
    game: "Battlegrounds Mobile India",
    registrationFee: 1000,
    duration: "4 Days",
    date: "June 20-23, 2024",
    description: "The ultimate battle royale showdown. Squad up and compete for glory in BGMI's premier tournament series.",
    prizePool: "₹3,00,000",
    maxTeams: 64,
    currentRegistrations: 45,
    gameImage: "/bgmi-banner.jpg",
    requirements: ["4 players + 1 substitute", "Minimum tier: Crown", "Working microphone", "Stable internet"]
  },
  {
    id: 3,
    title: "FIFA 24 Masters Cup",
    game: "FIFA 24",
    registrationFee: 500,
    duration: "2 Days",
    date: "June 28-29, 2024",
    description: "Show your football gaming skills in this prestigious FIFA tournament. 1v1 matches with group stages and knockouts.",
    prizePool: "₹1,50,000",
    maxTeams: 128,
    currentRegistrations: 86,
    gameImage: "/fifa24-banner.jpg",
    requirements: ["Individual participation", "Own FIFA 24 copy", "PS5/Xbox Series X", "PSN/Xbox Live subscription"]
  },
  {
    id: 4,
    title: "Rocket League Thunder Cup",
    game: "Rocket League",
    registrationFee: 750,
    duration: "2 Days",
    date: "July 8-9, 2024",
    description: "High-octane rocket-powered car soccer tournament. Team up and showcase your aerial skills!",
    prizePool: "₹75,000",
    maxTeams: 32,
    currentRegistrations: 28,
    gameImage: "/rocket-league-banner.jpg",
    requirements: ["3 players per team", "Minimum rank: Champion", "Discord required"]
  },
  {
    id: 5,
    title: "CS2 Pro Circuit",
    game: "Counter-Strike 2",
    registrationFee: 2000,
    duration: "5 Days",
    date: "August 1-5, 2024",
    description: "The premier Counter-Strike 2 tournament featuring the best teams. Intense tactical gameplay with professional production.",
    prizePool: "₹8,00,000",
    maxTeams: 16,
    currentRegistrations: 12,
    gameImage: "/cs2-banner.jpg",
    requirements: ["5 players + 1 coach", "Minimum rank: Global Elite", "Anti-cheat compliance", "Team uniforms"]
  },
  {
    id: 6,
    title: "Dota 2 International Qualifiers",
    game: "Dota 2",
    registrationFee: 2500,
    duration: "4 Days",
    date: "July 20-23, 2024",
    description: "The road to The International starts here. Compete in the most prestigious Dota 2 tournament qualifiers.",
    prizePool: "₹10,00,000",
    maxTeams: 16,
    currentRegistrations: 14,
    gameImage: "/dota2-banner.jpg",
    requirements: ["5 players + 1 substitute", "Minimum MMR: 6000", "Team organization registration", "Valid passports"]
  },
  {
    id: 7,
    title: "League of Legends India Cup",
    game: "League of Legends",
    registrationFee: 1800,
    duration: "5 Days",
    date: "August 10-14, 2024",
    description: "The biggest LoL tournament in South Asia. Battle in Summoner's Rift for glory and prizes.",
    prizePool: "₹7,00,000",
    maxTeams: 32,
    currentRegistrations: 28,
    gameImage: "/lol-banner.jpg",
    requirements: ["5 players + 2 substitutes", "Minimum rank: Diamond", "Team logo submission", "Age 16+"]
  },
  {
    id: 8,
    title: "Overwatch 2 Championship",
    game: "Overwatch 2",
    registrationFee: 1200,
    duration: "3 Days",
    date: "September 5-7, 2024",
    description: "Team-based action with the best Overwatch players competing for supremacy.",
    prizePool: "₹4,00,000",
    maxTeams: 24,
    currentRegistrations: 18,
    gameImage: "/overwatch2-banner.jpg",
    requirements: ["6 players + 2 substitutes", "Minimum rank: Masters", "Discord required"]
  },
  {
    id: 9,
    title: "Apex Legends Battle",
    game: "Apex Legends",
    registrationFee: 900,
    duration: "2 Days",
    date: "August 25-26, 2024",
    description: "Fast-paced battle royale action featuring the region's top squads.",
    prizePool: "₹2,50,000",
    maxTeams: 40,
    currentRegistrations: 35,
    gameImage: "/apex-banner.jpg",
    requirements: ["3 players + 1 substitute", "Minimum rank: Diamond", "Webcam required"]
  },
  {
    id: 10,
    title: "Street Fighter 6 Showdown",
    game: "Street Fighter 6",
    registrationFee: 500,
    duration: "2 Days",
    date: "July 29-30, 2024",
    description: "The ultimate fighting game tournament for SF6 players.",
    prizePool: "₹1,00,000",
    maxTeams: 64,
    currentRegistrations: 42,
    gameImage: "/sf6-banner.jpg",
    requirements: ["Individual participation", "Own controller/fight stick", "Age 15+"]
  }
];

export default function EsportsPage() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const tournamentsRef = useRef<HTMLDivElement>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    teamName: '',
    numberOfTeams: 1,
    captainName: '',
    email: '',
    phone: '',
    agreeToTerms: false
  });

  const scrollToTournaments = () => {
    tournamentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const allottedTime = `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`;
    
    // Simulate API call
    setTimeout(() => {
      setRegistrationComplete(true);
      // Reset form
      setRegistrationForm({
        teamName: '',
        numberOfTeams: 1,
        captainName: '',
        email: '',
        phone: '',
        agreeToTerms: false
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-20"
      >
        <source src="/gaming-background.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10">
        {/* Introduction Hero Section */}
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-5xl mx-auto"
            >
              <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-purple-500">
                Welcome to the Future of Gaming
              </h1>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                Where passion meets competition in the digital arena
              </p>
              <motion.button
                onClick={scrollToTournaments}
                className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full hover:shadow-neon transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Tournaments
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-gray-900/50 rounded-xl border border-violet-500/20"
                >
                  <div className="text-violet-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Overview */}
        <div className="py-20 bg-gray-900/80">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">Our Esports Services</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Comprehensive solutions for the competitive gaming ecosystem
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Tournament Management",
                  description: "End-to-end tournament organization including player registration, scheduling, and prize distribution",
                  icon: <GiTrophyCup className="w-12 h-12" />
                },
                {
                  title: "Professional Broadcasting",
                  description: "High-quality streams with expert commentary, graphics, and multi-platform integration",
                  icon: <SiTwitchIcon className="w-12 h-12" />
                },
                {
                  title: "Content Creation",
                  description: "Custom highlight reels, team features, and promotional content for maximum engagement",
                  icon: <SiYoutubegaming className="w-12 h-12" />
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 bg-gray-800/50 rounded-xl border border-violet-500/20"
                >
                  <div className="text-violet-400 mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tournaments Section */}
        <div ref={tournamentsRef} className="min-h-screen bg-gray-900/90 backdrop-blur-sm py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-500 to-purple-500 mb-6">
                Upcoming Tournaments
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join the most prestigious gaming competitions and prove your worth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTournament(tournament)}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:transform hover:scale-105 transition-all duration-300 border border-violet-500/20"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="relative h-48">
                    <Image
                      src={tournament.gameImage}
                      alt={tournament.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">{tournament.title}</h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300">
                        <FaRupeeSign className="w-5 h-5 mr-3 text-violet-400" />
                        <span>Registration Fee: ₹{tournament.registrationFee}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <FaClock className="w-5 h-5 mr-3 text-violet-400" />
                        <span>Duration: {tournament.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-300">
                        <FaCalendar className="w-5 h-5 mr-3 text-violet-400" />
                        <span>Date: {tournament.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tournament Details Modal */}
        <AnimatePresence>
          {selectedTournament && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedTournament(null)} />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-gray-900 rounded-2xl max-w-2xl w-full p-8 border border-violet-500/20"
              >
                <button
                  onClick={() => setSelectedTournament(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  <FaTimes className="w-6 h-6" />
                </button>

                <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={selectedTournament.gameImage}
                    alt={selectedTournament.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">{selectedTournament.title}</h3>
                <p className="text-gray-300 mb-6">{selectedTournament.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <FaRupeeSign className="w-5 h-5 mr-3 text-violet-400" />
                      <span>Fee: ₹{selectedTournament.registrationFee}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaClock className="w-5 h-5 mr-3 text-violet-400" />
                      <span>{selectedTournament.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaCalendar className="w-5 h-5 mr-3 text-violet-400" />
                      <span>{selectedTournament.date}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-300">
                      <FaTrophy className="w-5 h-5 mr-3 text-violet-400" />
                      <span>Prize Pool: {selectedTournament.prizePool}</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <FaUsers className="w-5 h-5 mr-3 text-violet-400" />
                      <span>{selectedTournament.currentRegistrations}/{selectedTournament.maxTeams} Teams</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Requirements:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {selectedTournament.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <button 
                  onClick={() => {
                    setShowRegistrationModal(true);
                    setSelectedTournament(null);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-semibold hover:shadow-neon transition-all duration-300"
                >
                  Register Now
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {showRegistrationModal && selectedTournament && (
          <RegistrationModal
            tournament={selectedTournament}
            onClose={() => {
              setShowRegistrationModal(false);
              setRegistrationComplete(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

const RegistrationModal = ({ tournament, onClose }: { tournament: Tournament; onClose: () => void }) => {
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    teamName: '',
    numberOfTeams: 1,
    captainName: '',
    email: '',
    phone: '',
    agreeToTerms: false
  });

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationComplete(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-gray-900 rounded-2xl max-w-md w-full p-8 border border-violet-500/20"
      >
        {!registrationComplete ? (
          <>
            <h3 className="text-2xl font-bold text-white mb-6">
              Register for {tournament.title}
            </h3>
            <form onSubmit={handleRegistration} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Team Name</label>
                <input
                  type="text"
                  required
                  value={registrationForm.teamName}
                  onChange={(e) => setRegistrationForm({
                    ...registrationForm,
                    teamName: e.target.value
                  })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Number of Teams</label>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setRegistrationForm(prev => ({
                      ...prev,
                      numberOfTeams: Math.max(1, prev.numberOfTeams - 1)
                    }))}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                  >
                    <FaMinus className="text-white" />
                  </button>
                  <span className="text-white text-xl font-bold">
                    {registrationForm.numberOfTeams}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRegistrationForm(prev => ({
                      ...prev,
                      numberOfTeams: Math.min(5, prev.numberOfTeams + 1)
                    }))}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700"
                  >
                    <FaPlus className="text-white" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Captain Name</label>
                <input
                  type="text"
                  required
                  value={registrationForm.captainName}
                  onChange={(e) => setRegistrationForm({
                    ...registrationForm,
                    captainName: e.target.value
                  })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({
                    ...registrationForm,
                    email: e.target.value
                  })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={registrationForm.phone}
                  onChange={(e) => setRegistrationForm({
                    ...registrationForm,
                    phone: e.target.value
                  })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-violet-500 focus:ring-violet-500"
                />
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  required
                  checked={registrationForm.agreeToTerms}
                  onChange={(e) => setRegistrationForm({
                    ...registrationForm,
                    agreeToTerms: e.target.checked
                  })}
                  className="w-4 h-4 border-gray-700 rounded text-violet-500 focus:ring-violet-500"
                />
                <label className="text-gray-300 text-sm">
                  I agree to the tournament rules and terms
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6 text-green-400">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Registration Complete!
            </h3>
            <p className="text-gray-300 mb-6">
              Thank you for registering for {tournament.title}.<br />
              Your allotted time is: <span className="font-bold text-violet-400">{`${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`}</span>
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}; 