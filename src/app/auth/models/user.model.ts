import { Sport } from './sport.model';

export class User {
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
