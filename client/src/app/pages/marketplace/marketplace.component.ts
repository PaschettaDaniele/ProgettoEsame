import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from 'src/app/utils/marketplace.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  rooms: any;
  houses: any;
  places: any;
  placesFull: any;
  // cardProva = {
  //   apartmentType: 'Room',
  //   owner: "Mario Rossi",
  //   price: {
  //     value: 100,
  //     currency: "mouth"
  //   },
  //   location: {
  //     city: "Rome",
  //     country: "Italy"
  //   },
  //   image: '../../../../assets/img/banner_background.jpg',
  //   persons: '2 - 4'
  // }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    MarketplaceService.getPlaces(this.http);
    MarketplaceService.houses$.subscribe((value) => this.houses = value);
    MarketplaceService.rooms$.subscribe((value) => this.rooms = value);
    MarketplaceService.places$.subscribe((value) => {
      this.placesFull = value;
      this.places = value.map((place: any) => {
        return {
          apartmentType: place.type,
          owner: place.ownerName ? place.ownerName : place.owner,
          price: {
            value: place.price.value,
            currency: place.price.currency
          },
          location: {
            city: place.city,
            country: place.country
          },
          image: place.images[0],
          persons: place.persons
        }
      });
    });
  }
}
