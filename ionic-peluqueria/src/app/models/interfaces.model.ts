export interface Service {
  id: string;
  title: string;
  image: string;
  price_euro: number;
  duration_minutes: number;
  type: string;
  isFavorite: boolean
}

export interface FirestoreService {
  id: string,
  title: string,
  image: string,
  price_euro: number,
  duration_minutes: number,
  type: string
}
