import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ForumComponent } from './forum.component';
import { ThreadComponent } from './thread/thread.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    ThemeModule
  ],
  declarations: [
    ForumComponent,
    ThreadComponent,
    CommentComponent
  ],
})
export class ForumModule { }