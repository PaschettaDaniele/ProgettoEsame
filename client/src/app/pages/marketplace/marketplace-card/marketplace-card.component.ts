import { Component, Input, OnInit } from '@angular/core';
import { MarketplaceDetailsService } from 'src/app/utils/marketplace-details.service';

@Component({
  selector: 'app-marketplace-card',
  templateUrl: './marketplace-card.component.html',
  styleUrls: ['./marketplace-card.component.css']
})
export class MarketplaceCardComponent implements OnInit {
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
    persons: string,
  };
  @Input() placeFull: any;

  constructor() { }

  ngOnInit(): void {
  }

  openDetail() {
    debugger
    MarketplaceDetailsService.show(this.placeFull)
  }
}
