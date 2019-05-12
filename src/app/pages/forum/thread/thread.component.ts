import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { forum_thread } from '../../../@core/data/forum_thread';
import { ForumService } from '../../../@core/services/forum.service';

@Component({
  selector: 'thread',
  templateUrl: './thread.component.html',
})
export class ThreadComponent implements OnInit {

  topicId: number;
  sub: any;

  constructor(private forumService: ForumService,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router) {

  }

  loading = false;
  threads: Array<forum_thread>;

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

        (data: forum_thread[]) => this.threads = data,
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false)
  }

  backClicked() {
    this._location.back();
  }

  newThreadClicked() {
    alert("New Thread Clicked!");
  }

  onClickThread(id: number) {

    // this.router.navigate(['thread', id]);
    this.router.navigate(['../comment', { threadId: id }], { relativeTo: this.route });
  }
}
