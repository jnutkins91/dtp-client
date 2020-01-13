import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FAQComponent } from './faq.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    FAQComponent,
  ],
})
export class FAQModule { }
