import { Observable } from 'rxjs';

export interface forum_thread {
  id: number;
  topic: string;
  body: string;
  forum_topic_id: number;
  creation_time: string;
  modification_time: string;
}

export abstract class ForumThreadData {
  abstract getThreads(): Observable<forum_thread[]>;
}