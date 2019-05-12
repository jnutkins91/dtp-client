import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forum_comment } from '../../../@core/data/forum_comment';
import { ForumService } from '../../../@core/services/forum.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {

  threadId: number;
  sub: any;

  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private _location: Location) {

  }

  loading = false;
  comments:  {
    title: '',
    dt_comment_lines: Array<forum_comment>
  };

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.threadId = +params['threadId']; // (+) converts string 'topicId' to a number
   });

    this.showComments();
  }

  showComments() {
    this.loading = true;
    this.forumService.getComments(this.threadId)
      .subscribe(

        (data) => this.comments = data,
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false)
  }

  newThreadClicked() {
    alert("New Thread Clicked!");
  }

  backClicked() {
    this._location.back();
  }
}
