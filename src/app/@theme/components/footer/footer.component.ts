import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    
    <div class="socials">
      <a href="https://www.facebook.com/jack.nutkins" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/classicnutkins" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/step39-com/about/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>

    <div style="float: right;">
      <a href="#/pages/faq" style="color: #a4abb3;">FAQ</a>
      <p style="display: inline;">  |  </p>
      <a href="#/pages/terms" style="color: #a4abb3;">Terms & Conditions</a>
      <p style="display: inline;">  |  </p>
      <a href="#/pages/privacy" style="color: #a4abb3;">Privacy Policy</a>
    </div>
  `,
})
export class FooterComponent {
}
