'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaGamepad, FaTrophy, FaTwitch, FaUsers, FaTimes, FaCalendar, FaClock, FaRupeeSign, FaMinus, FaPlus, FaCheck, FaPlay, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useRef, ReactNode, useEffect } from 'react';
import { SiTwitch as SiTwitchIcon, SiYoutubegaming, SiEpicgames } from 'react-icons/si';
import { GiTrophyCup, GiGamepadCross } from 'react-icons/gi';
import ThemeToggle from "@/components/theme-toggle";
import { GridCard } from "@/components/ui/grid-card";
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

interface LeaderboardPlayer {
  rank: number;
  name: string;
  team: string;
  game: string;
  points: number;
  winRate: string;
  avatar: string;
}

interface LiveStream {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewerCount: string;
  startTime: string;
  channelThumbnail?: string;
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
    gameImage: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
    gameImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
    gameImage: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
    gameImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
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
    gameImage: "https://images.unsplash.com/photo-1548686304-89d188a80029?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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
    gameImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
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

const leaderboardPlayers: LeaderboardPlayer[] = [
  {
    rank: 1,
    name: "Phantom_X",
    team: "Invictus Gaming",
    game: "VALORANT",
    points: 2850,
    winRate: "78%",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    rank: 2,
    name: "ShadowStrike",
    team: "Team Eclipse",
    game: "CS2",
    points: 2720,
    winRate: "75%",
    avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
  },
  {
    rank: 3,
    name: "NeonBlade",
    team: "Nexus Esports",
    game: "VALORANT",
    points: 2680,
    winRate: "72%",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    rank: 4,
    name: "VortexKing",
    team: "Quantum Force",
    game: "BGMI",
    points: 2590,
    winRate: "70%",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  },
  {
    rank: 5,
    name: "TitanSlayer",
    team: "Phoenix Rising",
    game: "Dota 2",
    points: 2510,
    winRate: "68%",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  }
];

const features = [
  {
    title: "Professional Tournaments",
    description: "Compete in high-stakes tournaments with substantial prize pools",
    icon: <GiTrophyCup className="w-8 h-8 text-white" />,
    gradient: "from-purple-600 to-indigo-600"
  },
  {
    title: "Live Streaming",
    description: "Professional broadcasting of all matches on major platforms",
    icon: <SiTwitchIcon className="w-8 h-8 text-white" />,
    gradient: "from-blue-600 to-cyan-600"
  },
  {
    title: "Community Events",
    description: "Regular community tournaments and gaming events",
    icon: <FaUsers className="w-8 h-8 text-white" />,
    gradient: "from-green-600 to-teal-600"
  },
  {
    title: "Gaming Support",
    description: "Technical support and gaming infrastructure",
    icon: <GiGamepadCross className="w-8 h-8 text-white" />,
    gradient: "from-red-600 to-pink-600"
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
  const [leaderboardFilter, setLeaderboardFilter] = useState<string>("all");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardPlayer[]>(leaderboardPlayers);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [isLoadingStreams, setIsLoadingStreams] = useState(false);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);
  const [showStreamModal, setShowStreamModal] = useState(false);

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

  const scrollToTournaments = () => {
    tournamentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegistrationError(null);
    
    try {
      // Insert data into Supabase
      const { data, error } = await supabase
        .from('gameregistrations')
        .insert([
          { 
            teamname: registrationForm.teamName,
            captianname: registrationForm.captainName,
            email: registrationForm.email,
            phoneno: parseInt(registrationForm.phone) || 0,
            registration_date: new Date().toISOString(),
            tournament_id: selectedTournament?.id,
            tournment_name: selectedTournament?.title
          }
        ]);
      
      if (error) {
        console.error('Error inserting data:', error);
        setRegistrationError('Failed to submit registration. Please try again.');
        setIsSubmitting(false);
        return;
      }
      
      // Registration successful
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
      
    } catch (error) {
      console.error('Unexpected error:', error);
      setRegistrationError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filterLeaderboard = (game: string) => {
    setLeaderboardFilter(game);
    if (game === "all") {
      setLeaderboardData(leaderboardPlayers);
    } else {
      setLeaderboardData(leaderboardPlayers.filter(player => player.game === game));
    }
  };

  // Fetch YouTube gaming streams
  useEffect(() => {
    const fetchGamingStreams = async () => {
      setIsLoadingStreams(true);
      setStreamError(null);
      
      try {
        const response = await fetch('/api/youtube-gaming-streams');
        if (!response.ok) {
          throw new Error('Failed to fetch streams');
        }
        const data = await response.json();
        setLiveStreams(data.streams);
      } catch (error) {
        console.error('Error fetching live streams:', error);
        setStreamError('Failed to load gaming streams. Please try again later.');
      } finally {
        setIsLoadingStreams(false);
      }
    };
    
    fetchGamingStreams();
  }, []);

  // Function to handle stream click
  const handleStreamClick = (stream: LiveStream) => {
    setSelectedStream(stream);
    setShowStreamModal(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Esports Gaming"
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
            Esports & Gaming Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto px-4 text-primary-foreground"
          >
            Professional esports tournaments and gaming events that elevate competitive gaming
          </motion.p>
        </div>
      </section>

      {/* Statistics Section */}
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
              Our Gaming Impact
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Leading the esports revolution in India
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-card-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Why Choose Our Gaming Services
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Experience gaming excellence with our professional services
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
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section ref={tournamentsRef} className="py-20 bg-card">
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
              Upcoming Tournaments
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Register for our upcoming esports tournaments
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tournaments.slice(0, 6).map((tournament, index) => (
              <GridCard key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative aspect-video overflow-hidden rounded-t-lg"
                  onClick={() => {
                    setSelectedTournament(tournament);
                    setShowRegistrationModal(true);
                  }}
                >
                  <Image
                    src={tournament.gameImage}
                    alt={tournament.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{tournament.title}</h3>
                    <p className="text-white/80">{tournament.game}</p>
                  </div>
                </motion.div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FaCalendar className="text-primary mr-2" />
                      <span className="text-muted-foreground">{tournament.date}</span>
                    </div>
                    <div className="flex items-center">
                      <FaRupeeSign className="text-primary mr-2" />
                      <span className="text-muted-foreground">{tournament.prizePool}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{tournament.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-semibold">
                      {tournament.currentRegistrations}/{tournament.maxTeams} Teams
                    </span>
                    <button
                      onClick={() => {
                        setSelectedTournament(tournament);
                        setShowRegistrationModal(true);
                      }}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </GridCard>
            ))}
          </div>
        </div>
      </section>

      {/* Live Gaming Streams Section */}
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
              Live Gaming Streams
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Watch popular esports events and gaming streams happening right now
            </motion.p>
          </motion.div>

          {isLoadingStreams ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : streamError ? (
            <div className="text-center py-10">
              <p className="text-red-500">{streamError}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {liveStreams.map((stream) => (
                <GridCard key={stream.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="h-full flex flex-col cursor-pointer"
                    onClick={() => handleStreamClick(stream)}
                  >
                    <div className="relative aspect-video rounded-t-lg overflow-hidden group">
                      <Image
                        src={stream.thumbnailUrl}
                        alt={stream.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300"
                        >
                          <FaPlay className="text-white w-6 h-6 ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded">
                        LIVE
                      </div>
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded flex items-center">
                        <FaUsers className="mr-1 text-xs" /> {stream.viewerCount}
                      </div>
                    </div>
                    <div className="p-4 flex-grow flex flex-col">
                      <h3 className="font-medium text-foreground line-clamp-2 mb-2">{stream.title}</h3>
                      <div className="flex items-center mt-auto">
                        {stream.channelThumbnail && (
                          <div className="w-6 h-6 rounded-full overflow-hidden mr-2 flex-shrink-0">
                            <Image
                              src={stream.channelThumbnail}
                              alt={stream.channelTitle}
                              width={24}
                              height={24}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <span className="text-sm text-muted-foreground truncate">{stream.channelTitle}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                        <span>Started {stream.startTime}</span>
                        <span className="text-primary hover:underline flex items-center">
                          <FaYoutube className="mr-1" /> Watch
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </GridCard>
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center">
            <Link
              href="https://www.youtube.com/gaming/live"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors inline-flex items-center"
            >
              <FaYoutube className="mr-2 text-lg" /> View More on YouTube Gaming
            </Link>
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
              Ready to Join the Competition?
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Register for our upcoming tournaments and showcase your gaming skills
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button
                onClick={() => tournamentsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 shadow-lg"
              >
                View Tournaments
              </button>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          </motion.div>
        </div>
      </section>

      {/* Add the Leaderboard Section after the CTA Section and before the Registration Modal */}
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
              Pro Players Leaderboard
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Top performers across our tournaments
            </motion.p>
          </motion.div>
          
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => filterLeaderboard("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                leaderboardFilter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              All Games
            </button>
            <button 
              onClick={() => filterLeaderboard("VALORANT")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                leaderboardFilter === "VALORANT" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              VALORANT
            </button>
            <button 
              onClick={() => filterLeaderboard("CS2")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                leaderboardFilter === "CS2" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              CS2
            </button>
            <button 
              onClick={() => filterLeaderboard("BGMI")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                leaderboardFilter === "BGMI" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              BGMI
            </button>
            <button 
              onClick={() => filterLeaderboard("Dota 2")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                leaderboardFilter === "Dota 2" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Dota 2
            </button>
          </div>
          
          <GridCard>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Rank</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Player</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Team</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Game</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Points</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-border hover:bg-muted/50 transition-colors duration-200"
                    >
                      <td className="px-4 py-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          player.rank === 1 ? "bg-yellow-500" : 
                          player.rank === 2 ? "bg-gray-300" : 
                          player.rank === 3 ? "bg-amber-600" : "bg-muted"
                        } ${player.rank <= 3 ? "text-white" : "text-muted-foreground"}`}>
                          {player.rank}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-muted">
                            <Image
                              src={player.avatar}
                              alt={player.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium text-card-foreground">{player.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{player.team}</td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {player.game}
                        </span>
                      </td>
                      <td className="px-4 py-4 font-semibold text-card-foreground">{player.points}</td>
                      <td className="px-4 py-4 text-green-500">{player.winRate}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 text-center">
              <Link href="/leaderboard" className="text-primary hover:underline text-sm font-medium">
                View Complete Leaderboard →
              </Link>
            </div>
          </GridCard>
        </div>
      </section>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegistrationModal && selectedTournament && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card w-full max-w-lg rounded-xl shadow-xl overflow-hidden"
            >
              {registrationComplete ? (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">Registration Complete!</h3>
                  <p className="text-muted-foreground mb-6">Thank you for registering. Check your email for further details.</p>
                  <button
                    onClick={() => {
                      setShowRegistrationModal(false);
                      setRegistrationComplete(false);
                    }}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center p-6 border-b border-border">
                    <h3 className="text-xl font-semibold text-card-foreground">{selectedTournament.title}</h3>
                    <button
                      onClick={() => setShowRegistrationModal(false)}
                      className="text-muted-foreground hover:text-card-foreground transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                    </button>
                  </div>
                  <form onSubmit={handleRegistration} className="p-6 space-y-4">
                    {registrationError && (
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                        {registrationError}
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">Team Name</label>
                      <input
                        type="text"
                        required
                        value={registrationForm.teamName}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, teamName: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">Captain Name</label>
                      <input
                        type="text"
                        required
                        value={registrationForm.captainName}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, captainName: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">Email</label>
                      <input
                        type="email"
                        required
                        value={registrationForm.email}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-1">Phone</label>
                      <input
                        type="tel"
                        required
                        value={registrationForm.phone}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        required
                        checked={registrationForm.agreeToTerms}
                        onChange={(e) => setRegistrationForm({ ...registrationForm, agreeToTerms: e.target.checked })}
                        className="mr-2"
                      />
                      <label className="text-sm text-muted-foreground">I agree to the terms and conditions</label>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Processing..." : "Complete Registration"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
        
      </AnimatePresence>

      {/* YouTube Stream Modal */}
      <AnimatePresence>
        {showStreamModal && selectedStream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowStreamModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card w-full max-w-4xl rounded-xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h3 className="text-xl font-semibold text-card-foreground line-clamp-1">{selectedStream.title}</h3>
                <button
                  onClick={() => setShowStreamModal(false)}
                  className="text-muted-foreground hover:text-card-foreground transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedStream.id}?autoplay=1`}
                  title={selectedStream.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-4">
                  {selectedStream.channelThumbnail && (
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <Image
                        src={selectedStream.channelThumbnail}
                        alt={selectedStream.channelTitle}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{selectedStream.channelTitle}</p>
                    <p className="text-sm text-muted-foreground">Live stream started {selectedStream.startTime}</p>
                  </div>
                  <div className="ml-auto flex items-center">
                    <span className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2">
                      <FaUsers className="mr-1 text-xs" /> {selectedStream.viewerCount} watching
                    </span>
                    <Link
                      href={`https://youtube.com/watch?v=${selectedStream.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center hover:bg-red-700 transition-colors"
                    >
                      <FaYoutube className="mr-1" /> Open on YouTube
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 