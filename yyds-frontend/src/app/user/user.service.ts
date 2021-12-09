import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private eventUrl = 'http://ec2-3-139-80-121.us-east-2.compute.amazonaws.com:5000/api/user';
  private userUrl = 'http://localhost:5000/api/user';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getUser(user_id: number): Observable<User[]> {
    const url = `${this.userUrl}/${user_id}`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`fetched event id=${user_id}`)),
        catchError(this.handleError<User[]>(`getUser id=${user_id}`))
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
