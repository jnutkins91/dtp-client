import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ReportUserService {

  token: string;

  constructor(private http: HttpClient) {

  }

  //  POST

  createReportUser(report: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/reportuser/', report);
  }
}
