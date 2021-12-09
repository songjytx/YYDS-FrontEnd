import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Group } from './group';
import { GroupService } from './group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './grouop-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group: Group | undefined;

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private location: Location) { }

  ngOnInit(): void {
    this.getGroup();
  }

  getGroup(): void {
    const group_id = parseInt(this.route.snapshot.paramMap.get('event_id')!, 10);
    this.groupService.getGroup(group_id)
      .subscribe(group => this.group = group[0]);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.group) {
      this.groupService.updateGroup(this.group)
        .subscribe(() => this.goBack());
    }
  }
}
