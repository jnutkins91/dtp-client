import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    UserProfileComponent,
  ],
})
export class UserProfileModule {

 }
