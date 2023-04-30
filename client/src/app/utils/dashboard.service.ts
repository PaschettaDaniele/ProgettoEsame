import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';
import { placeModel } from '../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  static places: any[] = [];
  private static placesSubject: Subject<any[]> = new Subject<any[]>();

  static selectedPlace: any = null;
  static selectedPlaceSubject: Subject<any> = new Subject<any>();

  static isNew: boolean = false;
  static isNewSubject: Subject<boolean> = new Subject<boolean>();

  static isEditing: boolean = false;
  static isEditingSubject: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  static get places$() {
    return this.placesSubject.asObservable();
  }

  static get selectedPlace$() {
    return this.selectedPlaceSubject.asObservable();
  }

  // #region getPlacesByUser
  static getPlacesByUser(httpClient: HttpClient, usernameOrEmail: string|null) {
    return httpClient.post<any>(`http://localhost:1337/api-token/placesByUser`, {usernameOrEmail}, { withCredentials: true }).subscribe({
      next: (data) => this.getPlacesByUserSuccess(data),
      error: (error) => this.getPlacesByUserError(error),
    });
  }
  private static getPlacesByUserSuccess(data: any): void {
    console.log(data);
    this.places = data.places;
    this.placesSubject.next(this.places);
  }
  private static getPlacesByUserError(error: any): void {
    console.log(error);
    this.places = [];
    this.placesSubject.next(this.places);
  }
  //#endregion

  // #region saveNewPlace
  static saveNewPlace(httpClient:HttpClient, newPlace: any){
    delete newPlace._id;
    newPlace.owner = localStorage.getItem('usernameOrEmail');
    newPlace.active = true;
    newPlace.price.currency = 'euro';

    return httpClient.post<any>('http://localhost:1337/api-token/addPlace', newPlace, { withCredentials: true }).subscribe({
      next: (data: any) => this.saveNewPlaceSuccess(data),
      error: (error: any) => this.saveNewPlaceError(error),
    });
  }

  private static saveNewPlaceSuccess(data: any){
    console.log(data)
    DashboardService.isNewSubject.next(false);
    window.location.reload();
  }

  private static saveNewPlaceError(error: any){
    console.log(error)
  }
  //#endregion

  //#region deletePlace
  static deletePlace(httpClient: HttpClient, placeId: string|null){
    return httpClient.post<any>('http://localhost:1337/api-token/deletePlace', {placeId}, { withCredentials: true }).subscribe({
      next: (data: any) => this.deletePlaceSuccess(data),
      error: (error: any) => this.deletePlaceError(error),
    });
  }
  private static deletePlaceSuccess(data: any){
    console.log(data);
    alert('Place deleted successfully!');
    window.location.reload();
  }
  private static deletePlaceError(error: any){
    console.log(error);
    alert('Error deleting place!');
  }
  //#endregion
}
