import { Observable } from 'rxjs';
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
          this.token = token.getValue();
        }

      });
  }

  //  GET

  getContract(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/contractoffer/' + id);
  }

  getLatestOffers(page: number): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/contractoffer/GetLatestOffers/' + page);
  }

  getContractComments(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/contractoffercomment/' + id);
  }

  getContractByTag(id: string): Observable<any> {
    return this.http.get(environment.apiUrl + '/api/contractoffer/tag/' + id);
  }

  getContractByUser(id: string): Observable<any> {

    return this.http.get(environment.apiUrl + '/api/contractoffer/user/' + id);
  }

  getMyContracts(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      }),
    };

    return this.http.get(environment.apiUrl + '/api/contractoffer/user', httpOptions);
  }

  //  POST

  newContractOffer(contract: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/contractoffer/', contract);
  }

  newContractOfferFile(formData: FormData, id: number): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token,
      }),

    };

    return this.http.post(environment.apiUrl + '/api/contractoffer/file/' + id, formData, httpOptions);
  }

  editContractOffer(contract: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/contractoffer/', contract);
  }

  newContractComment(contract_comment: any): Observable<any> {
    return this.http.post(environment.apiUrl + '/api/contractoffercomment', contract_comment);
  }

  suspendContract(contractId: number): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token,
      }),
    };

    return this.http.post(environment.apiUrl + '/api/contractoffer/suspend', contractId, httpOptions);
  }
}
