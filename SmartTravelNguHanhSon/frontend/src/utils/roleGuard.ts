import { UserRole } from '../types/user';

export const canAccessOwner = (role: UserRole) => role === 'owner';
export const canAccessAdmin = (role: UserRole) => role === 'admin';
export const canAccessUser = (role: UserRole) => role === 'user';
