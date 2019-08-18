import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ForumService {

  constructor(private http: HttpClient) {

  }

  //  GET

  getTopics(): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/forum/topics");
  }

  getThreads(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/forum/threads/" + id);
  }

  getComments(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/forum/comments/" + id);
  }

  //  POST

  newThread(thread: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/api/forum/threads", thread);
  }

  newComment(comment: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/api/forum/comments", comment);
  }
}