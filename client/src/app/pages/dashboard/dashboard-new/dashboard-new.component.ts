import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { placeModel } from 'src/app/models/place.model';
import { DashboardService } from 'src/app/utils/dashboard.service';

@Component({
  selector: 'app-dashboard-new-component',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent {

  images: any[] = [];
  newPlace: placeModel;

  location: any = {};
  people: any = {};
  price: any = {};

  constructor(private route: Router, private httpClient: HttpClient) {
    this.newPlace = {
      _id: '',
      name: '',
      type: 'apartment',
      description: '',
      location: {
        city: '',
        country: '',
        address: '',
        coordinates: {
          lat: 0,
          lng: 0
        }
      },
      owner: '',
      active: false,
      images: [],
      durationRent: 'short',
      price: {
        value: 0,
        currency: 'EUR',
        period: 'day'
      },
      people: {
        max: 0,
        min: 0
      }
    }
  }

  onFileSelected(event: any) {
    // get all the photos from the event and add the base64 to the images array
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        this.images.push(reader.result);
      }
    }
    console.log(this.images);
    // const file: File = event.target.files[0];
    // if (file) {
    //   // get the file in base64
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.images.push(reader.result);
    //   }
    // }
  }

  empty() {
    this.location = {};
    this.people = {};
    this.price = {};
    this.images = [];
  }

  cancel(){
    this.empty()
    DashboardService.isNewSubject.next(false);
  }
  done(){
    if(this.images.length < 0){
      alert('You must add at least one image');
      return;
    } else if(!this.location.city || !this.location.country || !this.location.address){
      alert('You must add a location');
      return;
    } else if(!this.people.min || !this.people.max){
      alert('You must add a number of people');
      return;
    } else if(this.price.value < 0){
      alert('You must add a price');
      return;
    } else {
      this.save();
    }
  }

  save() {
    if(this.people.max<this.people.min) this.people.max = this.people.min;
    this.newPlace!.location = this.location;
    this.newPlace!.people = this.people;
    this.newPlace!.price = this.price;
    this.newPlace!.images = this.images;
    DashboardService.saveNewPlace(this.httpClient ,this.newPlace);
  }
}
