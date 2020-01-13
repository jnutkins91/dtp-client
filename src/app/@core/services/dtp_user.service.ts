import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Injectable()
export class DTPUserService {

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

  getUserData(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/user/' + id);
  }

  getOtherUserData(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/user/other/' + id);
  }

  getAllUsers(page: number, searchTerm: string): Observable<any> {

    const userSearch = {

      page: page,
      searchTerm: searchTerm,
    };

    return this.http.post(environment.apiUrl + '/api/user/all/', userSearch);
  }

  updateUserData(user: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/user', user);
  }

  updateUserImage(formData: FormData): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
      }),

    };

    return this.http.post(environment.apiUrl + '/api/user/image', formData, httpOptions);
  }
}
