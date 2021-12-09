import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Group } from './group';
import { GroupWrapper} from "./group-wrapper";
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // private groupsUrl = 'http://ec2-3-139-80-121.us-east-2.compute.amazonaws.com:5000/api/group';
  private groupsUrl = 'http://localhost:5000/api/group';
  // private groupUrl = 'http://ec2-3-139-80-121.us-east-2.compute.amazonaws.com:5000/api/group';
  private groupUrl = 'http://localhost:5000/api/group';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getGroups(): Observable<Group[]> {
    this.log('fetched groups');

    return this.http.get<GroupWrapper>(this.groupsUrl).pipe(
      map(result=><Group[]><unknown>result.data),
      tap(_ => this.log('fetched groups')),
      catchError(this.handleError<Group[]>('getGroups', []))
    );
  }

    getGroup(group_id: number): Observable<Group[]> {
    const url = `${this.groupUrl}/${group_id}`;
    return this.http.get<Group[]>(url).pipe(
      tap(_ => this.log(`fetched group id=${group_id}`)),
        catchError(this.handleError<Group[]>(`getGroup id=${group_id}`))
    );
  }

  /** POST: add a new group to the server */
  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.groupsUrl, group, this.httpOptions).pipe(
      tap((newGroup: Group) => this.log(`added group w/ id=${newGroup.id}`)),
      catchError(this.handleError<Group>('addEvent'))
    );
  }

  /** DELETE: delete the group from the server */
  deleteGroup(group_id: number): Observable<Group> {
    const url = `${this.groupsUrl}/${group_id}`;

    return this.http.delete<Group>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted newGroup id=${group_id}`)),
      catchError(this.handleError<Group>('deleteGroup'))
    );
  }

  updateGroup(group: Group): Observable<any> {
    return this.http.put(`${this.groupsUrl}/${group.id}`, group, this.httpOptions).pipe(
      tap(_ => this.log(`updated group id=${group.id}`)),
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
    this.messageService.add(`GroupService: ${message}`);
  }
}
