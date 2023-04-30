import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'src/app/utils/dashboard.service';
import { LoadingService } from 'src/app/utils/loading.service';
import { placeModel } from 'src/app/models/place.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  places: Array<any> = [];
  rooms: Array<any> = [];
  apartments: Array<any> = [];

  selectedPlace: placeModel | undefined = undefined;
  selectedPlaceSubscription: any;

  placesSubject: any;

  isLoading: boolean = true;
  isShowingDetails: boolean = false;

  isNew: boolean = false;
  isNewSubscription: any;

  isEditing: boolean = false;
  isEditingSubscription: any;

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
    this.selectedPlaceSubscription = DashboardService.selectedPlace$.subscribe(selectedPlace => {
      this.selectedPlace = selectedPlace;
    });
    this.isNewSubscription = DashboardService.isNewSubject.subscribe(isNew => {
      this.isNew = isNew;
    });
    this.isEditingSubscription = DashboardService.isEditingSubject.subscribe(isEditing => {
      this.isEditing = isEditing;
    });
  }

  loadRoomsAndApartments() {
    for (const place of this.places) {
      if(place.type == 'room') this.rooms.push(place);
      else if(place.type == 'apartment') this.apartments.push(place);
    }
  }

  deleteSelected(){
    DashboardService.deletePlace(this.httpClient, this.selectedPlace!._id);
  }

  ngOnInit(): void {
    DashboardService.getPlacesByUser(this.httpClient, localStorage.getItem('usernameOrEmail'));
    this.isNew = false;
    this.isEditing = false;
  }

}
