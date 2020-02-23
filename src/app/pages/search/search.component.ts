import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../@core/services/search.service';
import { search } from '../../@core/data/search';

@Component({
  selector: 'search',
  styleUrls: ['./search.component.scss'],
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private searchService: SearchService) {

  }

  loading = false;

  p: number = 1;

  searchItems: search;
  searchTerm: string;

  ngOnInit() {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm'];
      this.getSearchItems(1, this.searchTerm)
    });
  }

  getSearchItems(page: number, searchTerm: string) {

    this.loading = true;
    this.searchService.getSearchResults(page, searchTerm)
      .subscribe(

        (data: search) => {

          this.searchItems = data;
          console.log(this.searchItems);
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }
}
