import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'src/app/utils/dashboard.service';
import { LoadingService } from 'src/app/utils/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  places: Array<any> = [];
  rooms: Array<any> = [];
  apartments: Array<any> = [];

  placesSubject: any;

  isLoading: boolean = true;
  loadingSubscription: any;

  constructor(private httpClient: HttpClient) {
    LoadingService.show();
    this.loadingSubscription = LoadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.placesSubject = DashboardService.places$.subscribe(places => {
      this.places = places;
      this.loadRoomsAndApartments();
      LoadingService.hide();
      this.isLoading = false;
    });
  }

  loadRoomsAndApartments() {
    for (const place of this.places) {
      if(place.type == 'room') this.rooms.push(place);
      else if(place.type == 'apartment') this.apartments.push(place);
    }
  }

  choosenPlace(place: any) {
    console.log(place);
  }

  ngOnInit(): void {
    DashboardService.getPlacesByUser(this.httpClient, localStorage.getItem('usernameOrEmail'));
  }

}
