import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardService } from 'src/app/utils/dashboard.service';

@Component({
  selector: 'app-dashboard-slider',
  templateUrl: './dashboard-slider.component.html',
  styleUrls: ['./dashboard-slider.component.css']
})
export class DashboardSliderComponent implements OnInit {
  selectedIndex: number = 0;
  @Input() places: Array<any> = [];

  disabledLeft: boolean = false;
  disabledRight: boolean = false;
  constructor() {
  }

  ngOnInit(){
    for (const place of this.places) {
      place.active = false;
    }
    this.places[0].active = true;
    this.disabledLeft = true;
    DashboardService.selectedPlace = this.places[0];
    DashboardService.selectedPlaceSubject.next(this.places[0]);
    console.log(this.places)
  }

  slideLeft() {
    this.places[this.selectedIndex].active = false;
    this.places[this.selectedIndex - 1].active = true;
    if(this.selectedIndex - 1 === 0) this.disabledLeft = true;
    this.selectedIndex--;
    this.disabledRight = false;
    DashboardService.selectedPlace = this.places[this.selectedIndex];
    DashboardService.selectedPlaceSubject.next(this.places[this.selectedIndex]);
  }

  slideRight() {
    this.places[this.selectedIndex].active = false;
    this.places[this.selectedIndex + 1].active = true;
    if(this.selectedIndex + 1 === this.places.length - 1) this.disabledRight = true;
    this.selectedIndex++;
    this.disabledLeft = false;
    DashboardService.selectedPlace = this.places[this.selectedIndex];
    DashboardService.selectedPlaceSubject.next(this.places[this.selectedIndex]);
  }
}
