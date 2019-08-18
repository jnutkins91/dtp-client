import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class ContractService {

  constructor(private http: HttpClient) {

  }

  //  GET

  getContract(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/contract/" + id);
  }

  getContractComments(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/contractoffercomment/" + id);
  }

  getContractByTag(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/contract/tag/" + id);
  }

  getContractByUser(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + "/api/contract/user/" + id);
  }

  //  POST

  newContractOffer(contract: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/api/contract/", contract);
  }
}