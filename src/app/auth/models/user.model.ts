import {Sport} from "./sport.model";

export class User {
  firstName?: string;
  lastName?: string;
  sport?: Sport;
  email?: string;
  password?: string;
  role?: string;
  createdAt?: Date;
}
