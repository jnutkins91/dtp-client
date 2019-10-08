import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Location } from '@angular/common';
import { forum_comment } from '../../../@core/data/forum_comment';
import { ForumService } from '../../../@core/services/forum.service';
import { NewCommentDialogComponent } from './newComment-dialog.component';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {

  threadId: number;
  sub: any;

  user = {};

  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private dialogService: NbDialogService,
    private authService: NbAuthService) {

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          console.log("Token:");
          console.log(token.getPayload());
          this.user = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
          console.log("User:");
          console.log(this.user);
        }

      });

  }

  loading = false;
  comments:  {
    thread: any,
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

  newCommentClicked() {

    //this.loading = true;

    //alert("New Thread Clicked!");
    this.dialogService.open(NewCommentDialogComponent, { context: { id: this.threadId } })
      .onClose.subscribe(newComment =>

        this.forumService.newComment(newComment)
          .subscribe(

            (data) => this.comments = data,
            err => console.error('Observer got an error: ' + err),
            () => this.loading = false)
      );
  }
}
