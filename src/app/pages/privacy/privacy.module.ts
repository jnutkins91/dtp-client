import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { PrivacyComponent } from './privacy.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    PrivacyComponent,
  ],
})
export class PrivacyModule { }
