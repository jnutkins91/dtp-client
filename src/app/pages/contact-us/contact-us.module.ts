import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ContactUsComponent } from './contact-us.component';

import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    ThemeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB-92xYu1mo6WwWLfidmA5MwAZGoybB9tY',
      libraries: ['places'],
    }),
  ],
  declarations: [
    ContactUsComponent
  ],
})
export class ContactUsModule { }