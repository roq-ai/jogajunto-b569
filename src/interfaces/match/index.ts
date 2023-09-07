import { UserInterface } from 'interfaces/user';
import { ScheduleInterface } from 'interfaces/schedule';
import { GetQueryInterface } from 'interfaces';

export interface MatchInterface {
  id?: string;
  user_id: string;
  schedule_id: string;
  opponent_id: string;
  score: number;
  status: string;
  created_at?: any;
  updated_at?: any;

  user_match_user_idTouser?: UserInterface;
  schedule?: ScheduleInterface;
  user_match_opponent_idTouser?: UserInterface;
  _count?: {};
}

export interface MatchGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  schedule_id?: string;
  opponent_id?: string;
  status?: string;
}
