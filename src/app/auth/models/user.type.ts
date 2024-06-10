import { Sport } from './sport.type';

export type User = {
  id?: number;
  firstName?: string;
  lastName?: string;
  city?: string;
  sport?: Sport;
  email?: string;
  password?: string;
  requiredRole?: string;
  createdAt?: Date;
  updatedAt?: Date;
  enabled?: boolean;
  acceptTerms?: boolean;
};
