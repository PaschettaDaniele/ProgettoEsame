import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MarketplaceService } from 'src/app/utils/marketplace.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent {
  rooms : any;
  houses : any;

  constructor(private http: HttpClient) {
    MarketplaceService.getPlaces(this.http);
    MarketplaceService.houses$.subscribe((value) => this.houses = value);
    MarketplaceService.rooms$.subscribe((value) => this.rooms = value);
  }
}
