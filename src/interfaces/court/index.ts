import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CourtInterface {
  id?: string;
  name: string;
  location: string;
  availability: boolean;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CourtGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  location?: string;
  user_id?: string;
}
