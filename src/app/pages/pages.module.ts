import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { MyAccountModule } from './my-account/my-account.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ForumModule } from './forum/forum.module';
import { SearchModule } from './search/search.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { HomePageModule } from './homepage/homepage.module';
import { ContractModule } from './contract/contract.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ContractCreateModule } from './contract-create/contract-create.module';
import { ContractEditModule } from './contract-edit/contract-edit.module';
import { ContractDetailModule } from './contract-detail/contract-detail.module';
import { ContractCurrentUserModule } from './contract-current-user/contract-current-user.module';
import { ContractPurchaseModule } from './contract-purchase/contract-purchase.module';
import { FAQModule } from './faq/faq.module';
import { TermsModule } from './terms/terms.module';
import { PrivacyModule } from './privacy/privacy.module';
import { AdminHomeModule } from './admin_home/admin_home.module';

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
    MarketplaceModule,
    ForumModule,
    MyAccountModule,
    SearchModule,
    UsersModule,
    TagsModule,
    HomePageModule,
    ContractModule,
    UserProfileModule,
    ContractCreateModule,
    ContractEditModule,
    ContractDetailModule,
    ContractCurrentUserModule,
    ContractPurchaseModule,
    FAQModule,
    TermsModule,
    PrivacyModule,
    AdminHomeModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
