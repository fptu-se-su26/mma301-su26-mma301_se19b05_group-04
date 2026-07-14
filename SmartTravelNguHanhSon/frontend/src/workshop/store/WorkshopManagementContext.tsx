import { createContext } from 'react';
import { Workshop, WorkshopStatus } from '../../../types/workshop';

export type WorkshopManagementContextType = {
  allWorkshops: Workshop[];
  addWorkshop: (workshop: Workshop) => void;
  updateWorkshop: (id: string, updates: Partial<Workshop>) => void;
  deleteWorkshop: (id: string) => void;
  updateWorkshopStatus: (id: string, status: WorkshopStatus) => void;
};

export const WorkshopManagementContext = createContext<WorkshopManagementContextType | undefined>(undefined);
