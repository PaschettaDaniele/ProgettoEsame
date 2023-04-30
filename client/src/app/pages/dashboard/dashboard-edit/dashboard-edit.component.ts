import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DashboardService } from 'src/app/utils/dashboard.service';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.css']
})
export class DashboardEditComponent {

  isEditingSubscription: any;
  isEditing: boolean = false;

  selectedPlaceSubscription: any;
  selectedPlace: any = null;



  constructor(private httpClient: HttpClient) {
    this.isEditingSubscription = DashboardService.isEditingSubject.subscribe(isEditing => {
      this.isEditing = isEditing;
    });
    this.selectedPlaceSubscription = DashboardService.selectedPlace$.subscribe(selectedPlace => {
      this.selectedPlace = selectedPlace;
      console.log(this.selectedPlace);
    });
  }

  cancel(){
    DashboardService.isEditingSubject.next(false);
  }

  done(){

  }
}
