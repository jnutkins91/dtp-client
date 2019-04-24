import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AboutModule } from './about/about.module';
import { MyAccountModule } from './my-account/my-account.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ForumModule } from './forum/forum.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    AboutModule,
    ContactUsModule,
    MarketplaceModule,
    ForumModule,
    MyAccountModule
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class PagesModule {
}
