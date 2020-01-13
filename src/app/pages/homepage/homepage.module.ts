import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { HomePageComponent } from './homepage.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    ThemeModule,
    NgxPaginationModule,
  ],
  declarations: [
    HomePageComponent,
  ],
})
export class HomePageModule { }
