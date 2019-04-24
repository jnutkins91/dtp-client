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
  `,
})
export class FooterComponent {
}
