export type SpotCategory = 'restaurant' | 'coffee' | 'dessert' | 'cocktail' | 'scenic' | 'nightlife' | 'bakery' | 'breakfast';

export interface MenuItem {
  name: string;
  category: 'Food' | 'Coffee' | 'Cocktail' | 'Dessert';
  priceETB: number;
  description: string;
  isPopular?: boolean;
}

export type KnownCategory = 
  | 'italian'
  | 'dessert'
  | 'coffee'
  | 'bakery'
  | 'breakfast'
  | 'dinner'
  | 'cocktail'
  | 'scenic';

export interface DateSpot {
  id: string;
  name: string;
  category: SpotCategory;
  subCategory?: 'Food' | 'Coffee' | 'Cocktails' | 'Dessert' | 'Scenic';
  knownCategory?: KnownCategory;
  bestKnownFor?: string;
  neighborhood: string;
  address: string;
  lat: number;
  lng: number;
  priceLevel: 'ETB $' | 'ETB $$' | 'ETB $$$' | 'ETB $$$$';
  avgCostForTwoETB: number;
  vibe: string;
  romanticHighlight: string;
  signatureOrder: string;
  openingHours: string;
  rating: number;
  reviewCount: number;
  image: string;
  interiorPhotos?: string[];
  interiorVibe?: string;
  menuHighlights?: MenuItem[];
  tags: string[];
  googleMapsUrl: string;
  appleMapsUrl?: string;
  phone?: string;
}

export type EventCategory = 'music' | 'art' | 'outdoor' | 'food' | 'cinema' | 'party';

export interface AddisEvent {
  id: string;
  title: string;
  organizer: string;
  category: EventCategory;
  venue: string;
  neighborhood: string;
  dayOfWeek: 'Friday Evening' | 'Saturday' | 'Sunday';
  dateStr: string; // e.g. "This Saturday, 5:00 PM"
  time: string;
  priceETB: number | 'Free';
  description: string;
  romanticReason: string;
  lat: number;
  lng: number;
  image: string;
  tags: string[];
  recommendedDressCode: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface DatePlan {
  id: string;
  title: string;
  targetDate: string; // ISO YYYY-MM-DD
  dayLabel?: string; // "Saturday" | "Sunday" | "Friday Night"
  time: string; // e.g. "17:30"
  timeSlot: 'morning' | 'afternoon' | 'sunset' | 'dinner' | 'night';
  proposedBy: string; // e.g. "Abeba" or "Yohannes" or "Me"
  status: 'idea' | 'planned' | 'confirmed' | 'completed';
  spots: DateSpot[];
  event?: AddisEvent;
  budgetETB: number;
  dressCode: string;
  notes: string;
  checklist: ChecklistItem[];
  reminderEnabled: boolean;
  reminderNotice: '1h' | '2h' | '1d' | 'friday_evening';
  createdAt: string;
  coupleSpaceId?: string;
  createdById?: string;
}

export interface CoupleProfile {
  partner1Name: string;
  partner2Name: string;
  anniversaryDate?: string;
  favoriteVibe?: string;
  reminderChannel?: 'in_app' | 'browser' | 'calendar';
}
