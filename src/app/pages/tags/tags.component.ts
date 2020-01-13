import { Component, OnInit } from '@angular/core';

import { tag } from '../../@core/data/tag';
import { TagService } from '../../@core/services/tag.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tags',
  styleUrls: ['./tags.component.scss'],
  templateUrl: './tags.component.html',
})
export class TagsComponent implements OnInit {

  collection = [];

  constructor(
    private router: Router,
    private tagService: TagService) {

      for (let i = 1; i <= 100; i++) {
        this.collection.push(`item ${i}`);
      }

  }

  loading = false;

  p: number = 1;

  searchTerm: string = '';

  tags: {
    totalTags: 0,
    tags: Array<tag>,
  };

  ngOnInit() {

    this.getTags(this.p, this.searchTerm);
  }

  onPageChange(number: number) {
    this.getTags(number, this.searchTerm);
  }

  showValue(searchTerm: string) {
    this.p = 1;
    this.searchTerm = searchTerm;
    this.getTags(this.p, this.searchTerm);
  }

  getTags(page: number, searchTerm: string) {
    this.loading = true;
    this.tagService.getTags(page, searchTerm)
      .subscribe(

        (data: any) => {

          this.tags = data;
        },
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  onClick_Tag(id: string, name: string) {

    this.router.navigate(['./pages/contract', { tagId: id, tagName: name }]);
  }
}
