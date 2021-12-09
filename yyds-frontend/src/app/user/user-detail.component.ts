import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location) { }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    const user_id = parseInt(this.route.snapshot.paramMap.get('event_id')!, 10);
    this.userService.getUser(user_id)
      .subscribe(user => this.user = user[0]);
  }

  goBack(): void {
    this.location.back();
  }
}
