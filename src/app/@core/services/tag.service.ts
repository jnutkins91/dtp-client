import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class TagService {

  constructor(private http: HttpClient) {

  }

  //  GET

  getTags(page: number, searchTerm: string): Observable<any> {

    const tagSearch = {

      page: page,
      searchTerm: searchTerm
    }

    return this.http.post(environment.apiUrl + "/api/tag/", tagSearch);
  }
}
