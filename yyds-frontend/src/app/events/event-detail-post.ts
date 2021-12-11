import {EventType} from "./event-type";
import {EventVenue} from "./event-venue";
import {User} from "../user/user";

export interface EventDetailPost {
  id: number,
  venue: EventVenue,
  description: string,
  type_id: number,
  starttime: string,
  endtime: string;
}
