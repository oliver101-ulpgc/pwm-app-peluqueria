export interface Service {
  id: number;
  type: string;
  image: string;
  title: string;
  price_euro: number;
  duration_minutes: number;
  clicks?: number;
}

export interface Portfolio {
  id: number;
  image: string;
  name: string;
  type: string;
}

export interface Review {
  id: string;
  text: string;
  stars: number;
  client: {
    id: string;
    username: string;
    image: string;
  }
}

export interface Hairdresser {
  id: string;
  name: string;
  image: string;
  hours: Array<string>;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
}

export interface Appointment {
  client: string;
  date: Date;
  hairdresser: string;
  services: string;
}
