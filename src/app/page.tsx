"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from 'next/image'
import ThemeToggle from "@/components/theme-toggle";
import { Marquee } from "@/components/magicui/marquee";
import ReviewCard from "@/components/magicui/reviewcard";
import TestimonialCarousel from "@/components/magicui/testimonial-carousel";



const App: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [email, setEmail] = useState("");
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    {
      url: "/images/ss.jpg",
      title: "Create. Stream. Dominate.",
      description: "Transforming digital dreams into viral reality. We don't just create content - we create culture."
    },
    {
      url:"/images/kai.jpg",
      title:"We Will carry you to the top",
      description:"With our gaming live streaming services, you'll be in the spotlight like never before."

    },
    {
      url: "/images/faze.webp",
      title: "Become a professional gamer",
      description: "High-quality streaming solutions for events of any scale."
    },
    {url:"/images/shopify.jpg",
      title:"Wanna see results like this?",
      description:"With our digital marketing services, you'll be able to crake the algorithm."
    },
    {
      url: "/images/mf.jpg",
      title: "Cinematic Production",
      description: "Creating compelling visual stories that captivate audiences."
    }
  ];

  const services = [
    {
      title: "Live Streaming",
      icon: "fa-video",
      description: "Professional streaming solutions for any scale",
      image:
        "/images/ttv.webp",
    },
    {
      title: "Media Production",  
      icon: "fa-film",
      description: "Cinematic content that captures attention",
      image:
        "/images/mp.jpg",
    },
    {
      title: "Digital Marketing",
      icon: "fa-chart-line",
      description: "Strategic campaigns that drive results",
      image:
        "/images/dm2.png",
    },
    {
      title: "Event Management",
      icon: "fa-calendar-check",
      description: "Seamless experiences from concept to execution",
      image:
        "/images/em.jpg",
    },
    {
      title: "Live Streaming",
      icon: "fa-video",
      description: "Professional streaming solutions for any scale",
      image:
        "/images/ss2.webp",
    },
    {
      title: "Esports Services",
      icon: "fa-gamepad",
      description: "Complete tournament and league solutions",
      image:
        "/images/ep.png",
    },
  ];

  const achievements = [
    { number: "100K+", label: "Hours Streamed" },
    { number: "500+", label: "Events Managed" },
    { number: "10M+", label: "Global Viewers" },
    { number: "200+", label: "Tournaments Hosted" },
  ];

  const reviews = [ 
    {
      name: "Jack Thompson",
      username: "@jackthompson",
      role: "Professional Streamer",
      location: "Los Angeles, CA",
      body: "ABC Studios revolutionized my streaming career. Their custom overlay designs and stream optimization increased my viewer retention by 40%. The technical support team is available 24/7 and really understands what streamers need.",
      img: "https://avatar.vercel.sh/jack",
      rating: 5
    },
    {
      name: "Jill Martinez",
      username: "@jillmartinez",
      role: "Esports Team Manager",
      location: "New York, NY",
      body: "Managing a top-tier esports team requires flawless production. ABC Studios delivered beyond expectations, handling our tournament streams with zero technical issues. Their instant replay system and multi-camera setups are game-changers.",
      img: "https://avatar.vercel.sh/jill",
      rating: 5
    },
    {
      name: "John Chen",
      username: "@johnchen",
      role: "Content Creator",
      location: "Toronto, Canada",
      body: "Their SEO and content strategy transformed my YouTube channel. Within 6 months, my subscriber count went from 50K to 500K. Their data-driven approach to content optimization really works.",
      img: "https://avatar.vercel.sh/john",
      rating: 4
    },
    {
      name: "Jane Wilson",
      username: "@janewilson",
      role: "Event Coordinator",
      location: "London, UK",
      body: "Coordinated a 3-day gaming festival with ABC Studios. They handled everything from stage design to live streaming. The AR integration for audience participation was brilliant. 10,000+ attendees and not a single technical hiccup.",
      img: "https://avatar.vercel.sh/jane",
      rating: 5
    },
    {
      name: "Jenny Kim",
      username: "@jennykim",
      role: "Gaming Influencer",
      location: "Seoul, South Korea",
      body: "As a bilingual streamer, I needed a team that could handle multi-language broadcasts. ABC Studios set up a seamless system for real-time translations and region-specific content delivery. My international audience grew by 200%.",
      img: "https://avatar.vercel.sh/jenny",
      rating: 4
    },
    {
      name: "James Rodriguez",
      username: "@jamesrod",
      role: "Tournament Organizer",
      location: "Madrid, Spain",
      body: "Organized the largest LATAM esports tournament with ABC Studios. Their production team handled 6 simultaneous game streams, real-time stats integration, and player cams flawlessly. The viewing experience was on par with major league broadcasts.",
      img: "https://avatar.vercel.sh/james",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="w-full min-h-screen bg-background overflow-hidden dark:bg-background text-foreground dark:text-foreground p-6 md:p-16 lg:p-24">
      <ThemeToggle />
      
      {/* Header */}
      <header className="fixed top-0 z-90 w-full md:hidden bg-background dark:bg-nav-bg text-foreground dark:text-nav-text font-bold tracking-widest text-3xl md:text-4xl lg:text-5xl p-4 md:p-8 lg:p-12">
        <div className="container mx-auto flex justify-center">Gooners</div>
      </header>

      {/* Hero Section */}
      <div className="pt-16 px-4 md:px-8 lg:px-16">
        <div className="h-[400px] md:h-[600px] relative rounded-xl overflow-hidden mb-8">
          <div className="relative w-full h-full">
            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/30 hover:bg-background/50 dark:bg-nav-bg/30 dark:hover:bg-nav-bg/50 text-foreground dark:text-nav-text w-10 h-10 rounded-full flex items-center justify-center transition-all"
              aria-label="Previous slide"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/30 hover:bg-background/50 dark:bg-nav-bg/30 dark:hover:bg-nav-bg/50 text-foreground dark:text-nav-text w-10 h-10 rounded-full flex items-center justify-center transition-all"
              aria-label="Next slide"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentHeroImage ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={image.url}
                  fill
                  className="object-cover"
                  alt={`Hero banner ${index + 1}`}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6 md:p-12">
                  <h1 className="text-white text-nav-text text-3xl md:text-5xl font-bold mb-2">
                    {image.title}
                  </h1>
                  <p className="text-white text-nav-text text-sm md:text-lg opacity-90 max-w-2xl">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHeroImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentHeroImage
                      ? "bg-nav-text w-4"
                      : "bg-nav-text/50 hover:bg-nav-text/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div id="services" className="px-4 md:px-8 lg:px-16 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow bg-card dark:bg-card text-card-foreground dark:text-card-foreground"
              onClick={() => setActiveService(index)}
            >
              <div className="h-24 w-full bg-muted dark:bg-muted rounded-t relative">
                <Image
                  src={service.image}
                  fill
                  className="object-cover rounded-t"
                  alt={service.title}
                />
              </div>
              <h3 className="text-center font-semibold mb-1 pt-2">
                {service.title}
              </h3>
              <p className="text-xs text-center text-muted-foreground dark:text-muted-foreground">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div id="achievements" className="w-full px-4 md:px-8 lg:px-16 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-card dark:bg-nav-bg text-card-foreground dark:text-nav-text rounded-xl p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold">{achievement.number}</div>
              <div className="text-sm md:text-base opacity-80">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>

  
       <section className="container relative mx-auto px-6 py-16 sm:py-24 overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-border/10"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-6 text-lg font-medium text-muted-foreground">
              Testimonials
            </span>
          </div>
        </div>
        
        <h2 className="mt-8 text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          What Our Users Say
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Hear from our global community about their experiences with ABC Studios
        </p>
        
        <TestimonialCarousel reviews={reviews} />
      </section>
    <div className="h-[100px]"></div>
    </div>
  );
};

export default App;
