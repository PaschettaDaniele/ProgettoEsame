import { Component } from '@angular/core';
import { MarketplaceDetailsService } from 'src/app/utils/marketplace-details.service';

@Component({
  selector: 'app-marketplace-details',
  templateUrl: './marketplace-details.component.html',
  styleUrls: ['./marketplace-details.component.css']
})
export class MarketplaceDetailsComponent {
  isShown: boolean = false;
  place: any;
  constructor() { }

  show() {
    this.place = MarketplaceDetailsService.place;
    this.isShown = true;
    console.log(this.place, this.isShown);
  }

  hide() {
    this.place = null;
    this.isShown = false;
  }

}
