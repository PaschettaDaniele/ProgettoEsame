import { Component, Input, OnInit } from '@angular/core';

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
  @Input() placesFull: any;

  constructor() { }

  ngOnInit(): void {
  }
}
