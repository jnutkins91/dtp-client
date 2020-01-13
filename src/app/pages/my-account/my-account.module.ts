import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { MyAccountComponent } from './my-account.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    MyAccountComponent,
  ],
})
export class MyAccountModule {

}
