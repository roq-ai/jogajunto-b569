import { MatchInterface } from 'interfaces/match';
import { UserInterface } from 'interfaces/user';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ScheduleInterface {
  id?: string;
  match_date: any;
  match_time: any;
  user_id: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  match?: MatchInterface[];
  user?: UserInterface;
  organization?: OrganizationInterface;
  _count?: {
    match?: number;
  };
}

export interface ScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  organization_id?: string;
}
