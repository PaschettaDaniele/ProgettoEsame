import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { placeModel } from 'src/app/models/place.model';
import { LoadingService } from 'src/app/utils/loading.service';
import { MarketplaceService } from 'src/app/utils/marketplace.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  rooms: any;
  houses: any;
  places!: placeModel[];
  isLoading: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    LoadingService.show();
    MarketplaceService.getPlaces(this.http);
    MarketplaceService.houses$.subscribe((value) => this.houses = value);
    MarketplaceService.rooms$.subscribe((value) => this.rooms = value);
    MarketplaceService.places$.subscribe((value) => {
      debugger
      this.places = value.map((place: any) => {
        place.owner = place.ownerName ? place.ownerName : place.owner;
        return place;
      });
      LoadingService.hide();
      this.isLoading = false;
    });
  }
}
