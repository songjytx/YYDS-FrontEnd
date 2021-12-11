import {EventType} from "./event-type";
import {EventVenue} from "./event-venue";
import {User} from "../user/user";

export interface EventDetail {
  id: number;
  organizer: User,
  venue: EventVenue,
  description: string,
  type: EventType,
  starttime: string,
  endtime: string;
}
