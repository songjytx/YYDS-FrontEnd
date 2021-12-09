import { Component, OnInit } from '@angular/core';
import { Event } from './event';
import { EventService } from './event.service';
import { MessageService } from '../messages/message.service';

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

  add(venue_id: number, description: string, organizer_id: number, type_id: number, starttime: string, endtime: string): void {
    description = description.trim();
    if (!description && !organizer_id && !type_id) { return; }
    this.eventService.addEvent({ organizer_id, description, type_id, starttime, endtime, venue_id} as Event)
      .subscribe(event => {
        this.events.push(event);
      });
  }

  delete(event: Event): void {
    this.events = this.events.filter(e => e !== event);
    this.eventService.deleteEvent(event.id).subscribe();
  }
}
