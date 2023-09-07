import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  user_id: string;
  reviewer_id: string;
  fair_play: number;
  playability: number;
  punctuality: number;
  availability: number;
  created_at?: any;
  updated_at?: any;

  user_review_user_idTouser?: UserInterface;
  user_review_reviewer_idTouser?: UserInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  reviewer_id?: string;
}
