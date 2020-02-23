import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataTransferService {

  constructor(private http: HttpClient) {

  }

  //  GET

  getMessages(): Observable<any> {

    return this.http.get(environment.apiUrl + '/api/datatransfer/');
  }

  ping(): Observable<any> {

    return this.http.get(environment.apiUrl + '/api/datatransfer/ping');
  }
}
