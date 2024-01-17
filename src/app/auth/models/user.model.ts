import { Sport } from './sport.model';

export class User {
  firstName?: string;
  lastName?: string;
  sport?: Sport;
  email?: string;
  password?: string;
  roles?: { id: number };
  createdAt?: Date;
  enabled?: boolean;
}
