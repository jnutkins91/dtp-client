import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Injectable()
export class ContractRequestService {

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

    getMyContractRequests(): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        return this.http.get(environment.apiUrl + "/api/contractrequest", httpOptions);
    }

    //  POST

    acceptRequest(requestId: number): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        return this.http.post(environment.apiUrl + "/api/contractrequest/accept", requestId, httpOptions);
    }

    rejectRequest(requestId: number): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            })
        };

        return this.http.post(environment.apiUrl + "/api/contractrequest/reject", requestId, httpOptions);
    }

}