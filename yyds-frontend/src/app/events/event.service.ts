import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Event } from './event';
import { EventWrapper} from "./event-wrapper";
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // private eventsUrl = 'http://ec2-3-139-80-121.us-east-2.compute.amazonaws.com:5000/api/event';
  private eventsUrl = 'http://127.0.0.1:5000/api/event';
  // private eventUrl = 'http://ec2-3-139-80-121.us-east-2.compute.amazonaws.com:5000/api/event';
  private eventUrl = 'http://127.0.0.1:5000/api/event';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getEvents(): Observable<Event[]> {
    this.log('fetched events');

    return this.http.get<EventWrapper>(this.eventsUrl).pipe(
      map(result => <Event[]><unknown>result.data),
      tap(_ => this.log('fetched events')),
      catchError(this.handleError<Event[]>('getEvents', []))
    );
  }

  getEvent(event_id: number): Observable<Event[]> {
    const url = `${this.eventUrl}/${event_id}`;
    return this.http.get<Event[]>(url).pipe(
      tap(_ => this.log(`fetched event id=${event_id}`)),
        catchError(this.handleError<Event[]>(`getEvent id=${event_id}`))
    );
  }

  /** POST: add a new event to the server */
  addEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.eventsUrl, event, this.httpOptions).pipe(
      tap((newEvent: Event) => this.log(`added event w/ id=${newEvent.id}`)),
      catchError(this.handleError<Event>('addEvent'))
    );
  }

  /** DELETE: delete the event from the server */
  deleteEvent(event_id: number): Observable<Event> {
    const url = `${this.eventsUrl}/${event_id}`;

    return this.http.delete<Event>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted newEvent id=${event_id}`)),
      catchError(this.handleError<Event>('deleteEvent'))
    );
  }

  updateEvent(event: Event): Observable<any> {
    return this.http.put(`${this.eventsUrl}/${event.id}`, event, this.httpOptions).pipe(
      tap(_ => this.log(`updated event id=${event.id}`)),
      catchError(this.handleError<any>('updateEvent'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    this.messageService.add(`EventService: ${message}`);
  }
}
