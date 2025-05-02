export interface Service {
  id: string;
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

export interface ReviewGraphData {
  bars: {
    stars: number,
    count: number,
  }[],
  meta: {
    total_reviews: number,
    average_rating: number
  }
}

export interface Hairdresser {
  id: string;
  name: string;
  image: string;
  hours: Array<string>;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Appointment {
  id?: string;
  date: Date;
  hairdresser: string;
  service: string;
}

export interface Details {
  id: string;
  image: string;
  address: string;
  telephone: string;
  email: string;
}
