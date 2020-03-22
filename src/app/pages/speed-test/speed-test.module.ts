import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { SpeedTestComponent } from './speed-test.component';

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    SpeedTestComponent,
  ],
})
export class SpeedTestModule { }
