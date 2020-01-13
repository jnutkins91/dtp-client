import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Injectable()
export class ConversationService {

  token: string;

  constructor(private http: HttpClient,
    private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.token = token.getValue();
        }

      });
  }

  //  GET

  getConversationsForUser(userId: number): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/conversation/' + userId);
  }

  getConversation(conversationId: number): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token
      }),
    };

    return this.http.get(environment.apiUrl + '/api/conversation/conversation/' + conversationId, httpOptions);
  }

  //  POST

  newMessage(newMessage: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/conversation', newMessage);
  }
}
