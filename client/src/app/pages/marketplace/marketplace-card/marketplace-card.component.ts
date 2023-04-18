import { Component, Input, OnInit } from '@angular/core';
import { placeModel } from 'src/app/models/place.model';
import { MarketplaceDetailsService } from 'src/app/utils/marketplace-details.service';

@Component({
  selector: 'app-marketplace-card',
  templateUrl: './marketplace-card.component.html',
  styleUrls: ['./marketplace-card.component.css']
})
export class MarketplaceCardComponent implements OnInit {
  @Input() place!: placeModel;

  constructor() {

  }

  ngOnInit(): void {
  }

  openDetail() {
    MarketplaceDetailsService.show(this.place)
    location.href = "/marketplace/details";
  }
}
