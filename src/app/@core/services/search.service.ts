import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class SearchService {

  token: string;

  constructor(private http: HttpClient) {

  }

  //  GET

  getSearchResults(page: number, searchTerm: string): Observable<any> {

    const search = {

      page: page,
      searchTerm: searchTerm,
    };

    return this.http.post(environment.apiUrl + '/api/search/', search);
  }
}
