import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Injectable()
export class TagService {

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

  getTags(page: number, searchTerm: string): Observable<any> {

    const tagSearch = {

      page: page,
      searchTerm: searchTerm,
    };

    return this.http.post(environment.apiUrl + '/api/tag/', tagSearch);
  }

  getWatchedTags(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      }),
    };

    return this.http.get(environment.apiUrl + '/api/tag/watched', httpOptions);
  }

  getIgnoredTags(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token,
      }),
    };

    return this.http.get(environment.apiUrl + '/api/tag/ignored', httpOptions);
  }
}
