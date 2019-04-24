import { Observable } from 'rxjs';

export interface forum_topic {
  id: number;
  topic: string;
  description: string;
  creation_time: string;
  modification_time: string;
}

export abstract class ForumData {
  abstract getTopics(): Observable<forum_topic[]>;
}