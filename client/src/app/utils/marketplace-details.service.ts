import { Injectable } from '@angular/core';
import { MarketplaceDetailsComponent } from 'src/app/pages/marketplace/marketplace-details/marketplace-details.component';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceDetailsService {
  static place: any;
  static MarketplaceDetailsComponent: MarketplaceDetailsComponent = new MarketplaceDetailsComponent();

  constructor() { }

  static show(place: any) {
    this.place = place;
    this.MarketplaceDetailsComponent.show();
  }

  static hide() {
    this.place = null;
    this.MarketplaceDetailsComponent.hide();
  }

}
