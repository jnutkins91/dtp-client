import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  styleUrls: ['./admin_home.component.scss'],
  templateUrl: './admin_home.component.html',
})
export class AdminHomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  loading = false;

  ngOnInit() {

  }

  onClickEditForumTopics() {

    this.router.navigate(['./pages/forum']);
  }

  onClickEditPrivacy() {

    this.router.navigate(['./pages/editors/ckeditor']);
  }

  onClickEditTerms() {

    this.router.navigate(['./pages/editors/ckeditor']);
  }

}
