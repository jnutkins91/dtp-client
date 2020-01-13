import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';

import { NbAuthJWTToken, NbAuthService, NbTokenService } from '@nebular/auth';
import { NbSearchService } from '@nebular/theme/components/search/search.service';
import { filter, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  value = '';

  user = {};

  userMenu = [{ title: 'Profile' }, { title: 'Log Out', data: { id: 'logout' } }];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private authService: NbAuthService,
    private nbMenuService: NbMenuService,
    private nbTokenService:NbTokenService,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: NbSearchService) {

      this.searchService.onSearchSubmit()
      .subscribe((data: any) => {       
        this.value = data.term;
        this.router.navigate(['/pages/search/'] , { queryParams: { searchTerm: this.value, relativeTo: this.route } });
      })

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
        }
      });
  }

  ngOnInit() {

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {

        if (title == "Log Out") {

          console.log("Log Out Pressed");
          this.nbTokenService.clear();
          this.user = {};
        }
        else if (title == "Profile") {

          console.log("Profile Pressed");
          this.router.navigate(['/pages/my-account', { }], { relativeTo: this.route });
        }

      });
  }

  loginClicked() {

    this.router.navigate(['/auth/login', { }], { relativeTo: this.route });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  newContractClicked() {
    this.router.navigateByUrl('/pages/contract-current-user', { state: { itemId: this.user['id'], tagName: '' }});
  }

  showAdminPanel() {

    this.router.navigate(['/pages/admin_home', { }], { relativeTo: this.route });
  }

  openWebsite() {

    window.open("https://dtp20200108070750.azurewebsites.net", "_blank");
  }

  onMenuClick(id){

    alert(id);
  }
}
