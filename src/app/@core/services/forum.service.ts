import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ForumService {

    constructor(private http:HttpClient) {

    }

  getTopics(): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/forum/topics");
  }

  getThreads(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/forum/threads/" + id);
  }
}