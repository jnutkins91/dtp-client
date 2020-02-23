import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
  
@Component({
  selector: 'contract-list-item',
  templateUrl: './contract-list-item.component.html',
  styleUrls: ['./contract-list-item.component.scss']
})
export class ContractListItemComponent {

  constructor(private router: Router) {

  }

  @Input() contractDetail;

  onClick_Contract(id: string) {

    this.router.navigate(['./pages/contract-detail', { contractId: id }]);
  }

  onClick_Tag(id: string, name: string) {

    this.router.navigate(['./pages/contract', { tagId: id, tagName: name }]);
  }

}