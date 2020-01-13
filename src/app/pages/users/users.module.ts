import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { UsersComponent } from './users.component';

import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    ThemeModule,
    NgxPaginationModule,
  ],
  declarations: [
    UsersComponent,
  ],
})
export class UsersModule {

}
