import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from './event';
import { EventService } from './event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private location: Location) { }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    const event_id = parseInt(this.route.snapshot.paramMap.get('event_id')!, 10);
    this.eventService.getEvent(event_id)
      .subscribe(event => this.event = event[0]);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.event) {
      this.eventService.updateEvent(this.event)
        .subscribe(() => this.goBack());
    }
  }
}
