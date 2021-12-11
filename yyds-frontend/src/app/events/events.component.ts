import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { EventService } from './event.service';
import { MessageService } from '../messages/message.service';
import {EventVenue} from "./event-venue";
import {EventDetailPost} from "./event-detail-post";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events : Event[] = [];

  constructor(private eventService: EventService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => this.events = events);
  }

  // add(eventVenueStreet: string, eventVenueUnit: string, description: string, type_id: number, venue_id: number, starttime: string, endtime: string): void {
  //   description = description.trim();
  //   if (!description && !type_id) { return; }
  //   this.eventService.addEvent({ description, type_id, starttime, endtime, venue_id} as Event)
  //     .subscribe(event => {
  //       this.events.push(event);
  //     });
  // }

  add(street: string, unit: string, city: string, state: string, postal_code: number, type_id: number, starttime: string, endtime: string, description: string): void {
    description = description.trim();
    if (!description || !type_id ) { return; }
    var venue = {street, unit, city, state, postal_code} as EventVenue;
    this.eventService.addEvent(({venue, type_id, starttime, endtime, description})as EventDetailPost)
      .subscribe(event => {
        this.events.push(event);
      });
  }

  delete(event: Event): void {
    this.events = this.events.filter(e => e !== event);
    this.eventService.deleteEvent(event.id).subscribe();
  }
}
