import { Sport } from './sport.model';

export class User {
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
}
