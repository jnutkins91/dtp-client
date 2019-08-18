import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { TagsComponent } from './tags.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    ThemeModule,
    NgxPaginationModule
  ],
  declarations: [
    TagsComponent
  ],
})
export class TagsModule { }