import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { forum_thread } from '../../../@core/data/forum_thread';
import { ForumService } from '../../../@core/services/forum.service';
import { NewThreadDialogComponent } from './newThread-dialog.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { forum_topic } from '../../../@core/data/forum_topic';

@Component({
  selector: 'thread',
  templateUrl: './thread.component.html',
})
export class ThreadComponent implements OnInit {

  topicId: number;
  sub: any;
  names: string[] = [];
  newThread: any;

  user = {};

  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: NbDialogService,
    private cd: ChangeDetectorRef,
    private authService: NbAuthService) {

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
        }

      });

  }

  loading = false;
  threads: {
    topic: forum_topic,
    dt_thread_lines: Array<forum_thread>,
  };

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.topicId = +params['topicId']; // (+) converts string 'topicId' to a number
    });

    this.showThreads();
  }

  showThreads() {
    this.loading = true;
    this.forumService.getThreads(this.topicId)
      .subscribe(

        (data) => this.threads = data,
        err => console.error('Observer got an error: ' + err),
        () => {
          this.cd.detectChanges();
          this.loading = false;     
        }
      );
  }

  newThreadClicked() {
    this.dialogService.open(NewThreadDialogComponent, { context: { id: this.topicId } })
      .onClose.subscribe(newThread =>

        this.forumService.newThread(newThread)
          .subscribe(

            (data) => this.threads = data,
            err => console.error('Observer got an error: ' + err),
            () => this.loading = false)
      );
  }

  onClickThread(id: number) {
    this.router.navigate(['../comment', { threadId: id }], { relativeTo: this.route });
  }
}
