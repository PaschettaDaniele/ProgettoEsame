import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  static places: any[] = [];
  private static placesSubject: Subject<any[]> = new Subject<any[]>();

  static selectedPlace: any = null;
  static selectedPlaceSubject: Subject<any> = new Subject<any>();

  constructor() { }

  static get places$() {
    return this.placesSubject.asObservable();
  }

  static get selectedPlace$() {
    return this.selectedPlaceSubject.asObservable();
  }

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
}
