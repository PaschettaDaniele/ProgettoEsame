import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-marketplace-card',
  templateUrl: './marketplace-card.component.html',
  styleUrls: ['./marketplace-card.component.css']
})
export class MarketplaceCardComponent {
  @Input() card!: {
    apartmentType: string,
    owner: string,
    price: {
      value: number,
      currency: string
    },
    location: {
      city: string,
      country: string
    },
    image: string,
    persons: number,
  };
}
