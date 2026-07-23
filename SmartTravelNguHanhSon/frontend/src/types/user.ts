export type UserRole = 'user' | 'owner' | 'admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  provider?: 'local' | 'google';
  googleId?: string;
  workshopName?: string;
  workshopAddress?: string;
}
