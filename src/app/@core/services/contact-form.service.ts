import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { contactForm } from '../data/contact-form';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Response }  from "@angular/http";

@Injectable()
export class ContactFormService {

    constructor(private http:HttpClient) {

    }

  post(form: contactForm): Observable<any> {

    return this.http.post<contactForm>(environment.apiUrl + "/api/contactform", form, null)
    .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}