import { createContext } from 'react';
import { WorkshopBooking } from '../../../types/workshop';

export type WorkshopBookingContextType = {
  workshopBookings: WorkshopBooking[];
  addWorkshopBooking: (booking: WorkshopBooking) => void;
  cancelWorkshopBooking: (id: string) => void;
  updateWorkshopBookingStatus: (id: string, status: WorkshopBooking['status']) => void;
};

export const WorkshopBookingContext = createContext<WorkshopBookingContextType | undefined>(undefined);
