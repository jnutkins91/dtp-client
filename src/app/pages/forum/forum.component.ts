import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forum_topic } from '../../@core/data/forum_topic';
import { ForumService } from '../../@core/services/forum.service';

@Component({
  selector: 'forum',
  templateUrl: './forum.component.html',
})
export class ForumComponent implements OnInit {

  constructor(private forumService: ForumService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  loading = false;
  topics: Array<forum_topic>;

  ngOnInit() {

    this.showTopics();
  }

  showTopics() {
    this.loading = true;
    this.forumService.getTopics()
      .subscribe(

        (data: forum_topic[]) => this.topics = data,
        err => console.error('Observer got an error: ' + err),
        () => this.loading = false);
  }

  onClickTopic(id: number) {

    this.router.navigate(['./thread', { topicId: id }], { relativeTo: this.route });
  }
}
