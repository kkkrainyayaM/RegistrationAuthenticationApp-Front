import {Status} from './status.enum';

export class User {
  id: number;
  username: string;
  password: string;
  email: string;
  dateOfLastLogin: Date;
  dateOfRegistration: Date;
  status: Status;
  isSelected = false;
}
