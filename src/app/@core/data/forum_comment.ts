import { Observable } from 'rxjs';

export interface forum_comment {
  id: number;
  body: string;
  forum_thread_id: number;
  creation_time: string;
  modification_time: string;
}

export abstract class ForumCommentData {
  abstract getThreads(): Observable<forum_comment[]>;
}
