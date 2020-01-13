import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { TermsComponent } from './terms.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    TermsComponent,
  ],
})
export class TermsModule { }
