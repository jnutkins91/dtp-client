import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Injectable()
export class ContractService {

  token: string;

  constructor(private http: HttpClient,
    private authService: NbAuthService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          console.log("Token:");
          console.log(token.getPayload());
          this.token = token.getValue();
        }

      });
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

  getMyContracts(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };

    return this.http.get(environment.apiUrl + "/api/contract/user", httpOptions);
  }

  //  POST

  newContractOffer(contract: any): Observable<any> {
    return this.http.post(environment.apiUrl + "/api/contract/", contract);
  }
}