import { Sport } from './sport.model';

export class CurrentUser {
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
