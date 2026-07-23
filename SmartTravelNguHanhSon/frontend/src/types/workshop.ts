export type WorkshopStatus = 'pending' | 'approved' | 'hidden';
export type WorkshopBookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Workshop {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  category: string;
  location: string;
  address: string;
  description: string;
  detailDescription?: string;
  image: string;
  images: string[];
  price: number;
  duration: string;
  rating: number;
  maxParticipants: number;
  hostName: string;
  included: string[];
  scheduleSlots: string[];
  latitude: number;
  longitude: number;
  status: WorkshopStatus;
  isActive: boolean;
  createdAt: string;
}

export interface WorkshopBooking {
  id: string;
  bookingCode: string;
  userId: string;
  customerName: string;
  phone: string;
  email: string;
  workshopId: string;
  workshopTitle: string;
  workshopImage: string;
  ownerId: string;
  ownerName: string;
  date: string;
  timeSlot: string;
  participants: number;
  note?: string;
  totalPrice: number;
  status: WorkshopBookingStatus;
  createdAt: string;
}
