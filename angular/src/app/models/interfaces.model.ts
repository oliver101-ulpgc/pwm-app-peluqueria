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

export interface Reviews {
  "id": number;
  "text": string;
  "stars": number;
  "client": {
    "id": number;
    "username": string;
    "email": string;
    "phone_number": number;
    "image": string;
  }
}

export interface Hairdressers {
  "id": number;
  "name": string;
  "image": string;
}
