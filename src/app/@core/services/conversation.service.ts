import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConversationService {

  constructor(private http: HttpClient) {

  }

  //  GET

  getConversationsForUser(userId: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/conversation/" + userId);
  }

  getConversation(conversationId: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/conversation/conversation/" + conversationId);
  }

  //  POST

  newMessage(newMessage: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/api/conversation", newMessage);
  }
}