import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './events/events.component';
import { GroupsComponent } from './groups/groups.component';
import { FormsModule } from '@angular/forms';
import { EventDetailComponent } from './events/event-detail.component';
import { GroupDetailComponent} from "./groups/group-detail.component";
import { UserDetailComponent} from "./user/user-detail.component";
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    GroupsComponent,
    EventDetailComponent,
    GroupDetailComponent,
    UserDetailComponent,
    MessagesComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
