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
          console.log("Token:");
          console.log(token.getPayload());
          this.user = token.getPayload(); // here we receive a payload from the token and assign it to our `user` variable 
          console.log("User:");
          console.log(this.user);
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

    this.router.navigate(['/auth/register', { }], { relativeTo: this.route });
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

  showDirectMessages() {

    this.router.navigate(['/pages/direct-messages', { }], { relativeTo: this.route });
  }

  openWebsite() {

    window.open("https://serene-payne-127cc8.netlify.com", "_blank");
  }

  onMenuClick(id){

    alert(id);
  }
}
