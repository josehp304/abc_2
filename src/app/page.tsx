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


const App: React.FC = () => {
  const [activeService, setActiveService] = useState(0);
  const [email, setEmail] = useState("");
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  const heroImages = [
    {
      url: "/images/8878659.jpg",
      title: "Create. Stream. Dominate.",
      description: "Transforming digital dreams into viral reality. We don't just create content - we create culture."
    },
    {
      url:"/images/8878659.jpg",
      title:"We Will carry you to the top",
      description:"With our gaming live streaming services, you'll be in the spotlight like never before."

    },
    {
      url: "/images/8878659.jpg",
      title: "Professional Live Streaming",
      description: "High-quality streaming solutions for events of any scale."
    },
    {url:"/images/8878659.jpg",
      title:"Wanna see results like this?",
      description:"With our digital marketing services, you'll be able to crake the algorithm."
    },
    {
      url: "/images/8878659.jpg",
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
        "/images/8878659.jpg",
    },
    {
      title: "Media Production",
      icon: "fa-film",
      description: "Cinematic content that captures attention",
      image:
        "/images/8878659.jpg",
    },
    {
      title: "Digital Marketing",
      icon: "fa-chart-line",
      description: "Strategic campaigns that drive results",
      image:
        "/images/8878659.jpg",
    },
    {
      title: "Event Management",
      icon: "fa-calendar-check",
      description: "Seamless experiences from concept to execution",
      image:
        "/images/8878659.jpg",
    },
    {
      title: "Live Streaming",
      icon: "fa-video",
      description: "Professional streaming solutions for any scale",
      image:
        "/images/8878659.jpg",
    },
    {
      title: "Esports Services",
      icon: "fa-gamepad",
      description: "Complete tournament and league solutions",
      image:
        "/images/8878659.jpg",
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
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Jenny",
      username: "@jenny",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/jenny",
    },
    {
      name: "James",
      username: "@james",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/james",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSubscribe = () => {
    if (email) {
      // Add subscription logic here
      console.log('Subscribing email:', email);
      setEmail("");
    }
  };

  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <div className="w-full min-h-screen bg-background dark:bg-background text-foreground dark:text-foreground md:pd-[200px]">
      <ThemeToggle />
      
      {/* Header */}
      <header className="fixed z-90 w-full md:hidden bg-background dark:bg-nav-bg text-foreground dark:text-nav-text font-bold tracking-widest text-3xl md:text-4xl lg:text-5xl p-4 md:p-8 lg:p-12">
        <div className="container mx-auto flex justify-center">ABC STUDIOS</div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6">
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

      {/* Newsletter Subscription */}
      {/* <div className="w-full px-4 md:px-8 lg:px-16 mb-8">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSubscribe}>Subscribe</Button>
          </div>
        </div>
      </div>
       */}
       <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
    <div className="h-[100px]"></div>
    </div>
  );
};

export default App;
