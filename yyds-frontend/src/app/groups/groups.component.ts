import { Component, OnInit } from '@angular/core';
import { Group } from './group';
import { GroupService } from './group.service';
import { MessageService } from '../messages/message.service';

@Component({
  selector: 'app-events',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups : Group[] = [];

  constructor(private groupService: GroupService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

  add(venue_id: number, description: string, organizer_id: number, type_id: number, starttime: string, endtime: string): void {
    description = description.trim();
    if (!description && !organizer_id && !type_id) { return; }
    this.groupService.addGroup({ organizer_id, description, type_id, starttime, endtime, venue_id} as Group)
      .subscribe(group => {
        this.groups.push(group);
      });
  }

  delete(group: Group): void {
    this.groups = this.groups.filter(g => g !== group);
    this.groupService.deleteGroup(group.id).subscribe();
  }
}
