import { ReactNode } from 'react';

export interface ServiceFeature {
  id: number;
  title: string;
  url: string;
  icon: ReactNode;
  description: string;
  features: string[];
  gradient: string;
  dotColor: string;
}

export interface Tournament {
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

export interface RegistrationForm {
  teamName: string;
  numberOfTeams: number;
  captainName: string;
  email: string;
  phone: string;
  agreeToTerms: boolean;
}

export interface ServiceCardProps {
  service: ServiceFeature;
  index: number;
} 