import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { AdminHomeComponent } from './admin_home.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    ThemeModule,
    NgxPaginationModule
  ],
  declarations: [
    AdminHomeComponent
  ],
})
export class AdminHomeModule { }