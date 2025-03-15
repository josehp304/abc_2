import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function Test() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "/images/8878659.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "/images/ge.jpg",
    },
    
  ];
  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
}

