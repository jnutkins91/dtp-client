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
}