"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaSearch, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
  tags?: string[];
  content?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Evolution of Digital Animation: From Pixels to Perfection",
    excerpt: "Explore the journey of digital animation from its humble beginnings to the cutting-edge techniques used today.",
    content: "Digital animation has come a long way since its inception. From basic pixel art to sophisticated 3D rendering, the evolution has been nothing short of remarkable. Today's animators have access to powerful tools that enable them to create stunning visual effects and lifelike characters.\n\nThe journey began with simple 2D animations, where artists painstakingly created frame-by-frame sequences. As technology advanced, we saw the emergence of computer-assisted animation tools, which streamlined the process and opened up new possibilities.\n\nNow, with the advent of AI and machine learning, we're entering a new era of animation. These technologies are helping artists automate repetitive tasks and focus more on creative aspects. The future looks even more promising with real-time rendering and virtual production becoming mainstream.",
    category: "Animation",
    date: "Mar 15, 2025",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1616499615673-b0e0b4c4c3a6?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Arjun Patel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    featured: true,
    tags: ["3D Animation", "Motion Graphics", "Technology"],
  },
  {
    id: "2",
    title: "Mastering Color Theory in Digital Design",
    excerpt: "Learn how to use color psychology and theory to create more impactful digital designs.",
    category: "Design",
    date: "Mar 14, 2025",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Priya Singh",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "3",
    title: "The Future of Web Development: What to Expect in 2026",
    excerpt: "A deep dive into emerging web technologies and trends that will shape the future of development.",
    category: "Development",
    date: "Mar 13, 2025",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Rahul Sharma",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "4",
    title: "AI-Powered Marketing: Revolutionizing Digital Campaigns",
    excerpt: "Discover how artificial intelligence is transforming digital marketing strategies and customer engagement in 2025.",
    category: "Marketing",
    date: "Mar 12, 2025",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Neha Kapoor",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    },
    featured: true,
    tags: ["AI", "Digital Marketing", "Analytics"],
  },
  {
    id: "5",
    title: "Event Planning in the Digital Age: A Complete Guide",
    excerpt: "Master the art of organizing successful events by leveraging technology and digital tools for seamless execution.",
    category: "Marketing",
    date: "Mar 11, 2025",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "6",
    title: "Behind the Screens: Creating a Virtual Reality Experience",
    excerpt: "Take a peek behind the scenes of our latest VR project and learn about the challenges and triumphs in VR development.",
    category: "Animation",
    date: "Mar 10, 2025",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Aisha Khan",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "7",
    title: "Social Media Trends That Will Dominate 2025",
    excerpt: "Stay ahead of the curve with our comprehensive analysis of emerging social media marketing trends and strategies.",
    category: "Marketing",
    date: "Mar 09, 2025",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1611162616305-c69b3fa7cbe0?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Sanjay Gupta",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "8",
    title: "Creating Immersive Brand Experiences Through Design",
    excerpt: "Learn how to craft memorable brand experiences by combining visual design, interaction, and storytelling.",
    category: "Design",
    date: "Mar 08, 2025",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Maya Reddy",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "9",
    title: "From Concept to Launch: Making of a Corporate Event",
    excerpt: "A detailed walkthrough of how we orchestrated a successful tech conference, from initial planning to execution.",
    category: "Marketing",
    date: "Mar 07, 2025",
    readTime: "9 min read",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    author: {
      name: "Rohan Desai",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    },
  },
];

const categories = ["All", "Animation", "Design", "Development", "Marketing"];

export default function BlogPage() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    // Check for saved theme preference
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        setDarkTheme(savedTheme === "dark");
      } else {
        // Check system preference
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setDarkTheme(prefersDark);
      }
    } catch (e) {
      console.error("Failed to access localStorage:", e);
    }

    // Add scroll event listener
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Add escape key listener for modal
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      toast.success(`${newTheme ? "Dark" : "Light"} mode activated`, {
        style: {
          background: newTheme ? "#374151" : "#fff",
          color: newTheme ? "#fff" : "#374151",
        },
      });
    } catch (e) {
      console.error("Failed to access localStorage:", e);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value && selectedCategory !== "All") {
      toast(`Searching for "${value}" in ${selectedCategory} category`, {
        icon: "🔍",
      });
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    toast.success("Search cleared", { icon: "🔄" });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== "All") {
      toast.success(`Showing ${category} posts`, { icon: "📑" });
    }
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Back to top", { icon: "⬆️" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Blog - ABC Studios</title>
      </Head>
      <Toaster position="bottom-right" />

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 p-0 overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
              {/* Left Side - Image */}
              <div className="relative h-[300px] md:h-full">
                <Image
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors md:hidden"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Right Side - Content */}
              <div className="relative flex flex-col h-full max-h-[90vh] md:max-h-[80vh]">
                {/* Close button for larger screens */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors hidden md:block"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header */}
                <div className="p-6 border-b dark:border-gray-700">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={selectedPost.author.avatar}
                        alt={selectedPost.author.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedPost.author.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedPost.date} · {selectedPost.readTime}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      {selectedPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {selectedPost.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                    {selectedPost.excerpt}
                  </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  <div className="prose dark:prose-invert max-w-none">
                    {selectedPost.content?.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-600 dark:text-gray-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                {selectedPost.tags && (
                  <div className="p-6 border-t dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className={`min-h-screen ${darkTheme ? "dark" : ""} transition-colors duration-300`}>
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-10 flex flex-col gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-lg"
            aria-label="Toggle theme"
          >
            {darkTheme ? <FaSun className="w-6 h-6" /> : <FaMoon className="w-6 h-6" />}
          </button>
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                onClick={scrollToTop}
                className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-lg"
                aria-label="Scroll to top"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=2000&q=80"
              alt="Blog hero"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90" />
          </div>
          <div className="relative container mx-auto px-4 text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Our Latest Insights
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl max-w-2xl mx-auto"
            >
              Discover the latest trends and insights in design, development, and digital creativity
            </motion.p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                  isSearchFocused ? "text-purple-500" : "text-gray-400"
                }`} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`w-full pl-10 pr-10 py-2 rounded-lg border transition-all duration-200 outline-none ${
                    isSearchFocused
                      ? "border-purple-500 ring-2 ring-purple-500/20"
                      : "border-gray-300 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      aria-label="Clear search"
                    >
                      <FaTimes />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-purple-600 text-white scale-105 shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {featuredPosts.length > 0 && searchQuery === "" && selectedCategory === "All" && (
          <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <motion.article
                    key={post.id}
                    variants={fadeInUp}
                    onClick={() => setSelectedPost(post)}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                  >
                    <div className="relative h-64">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-purple-600 rounded-full">
                          {post.category}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                              sizes="32px"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{post.author.name}</p>
                            <p className="text-xs opacity-75">{post.date} · {post.readTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {regularPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={fadeInUp}
                  onClick={() => setSelectedPost(post)}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                >
                  <div className="relative h-48 sm:h-56">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {post.date} · {post.readTime}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      {post.tags && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}