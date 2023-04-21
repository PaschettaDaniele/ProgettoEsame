import { Component, Input, OnInit } from '@angular/core';
import { placeModel } from 'src/app/models/place.model';

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

}
