export interface Services {
  id: number;
  type: string;
  image: string;
  title: string;
  price_euro: number;
  duration_minutes: number;
  clicks?: number;
}

export interface Portfolio {
  "id": number;
  "image": string;
  "name": string;
  "type": string;
}
