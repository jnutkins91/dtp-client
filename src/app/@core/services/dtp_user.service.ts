import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DTPUserService {

    constructor(private http:HttpClient) {

    }

  getUserData(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/user/" + id);
  }

  getOtherUserData(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/user/other/" + id);
  }

  getAllUsers(page: number, searchTerm: string): Observable<any> {

    var userSearch = {

      page: page,
      searchTerm: searchTerm
    }

    return this.http.post(environment.apiUrl + "/api/user/all/", userSearch);
  }

  updateUserData(user: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/api/user", user);
  }
}