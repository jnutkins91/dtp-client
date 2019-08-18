import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    SearchComponent
  ],
})
export class SearchModule { }