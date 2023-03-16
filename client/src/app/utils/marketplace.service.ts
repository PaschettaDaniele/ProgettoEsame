import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';
import { ModalMenager } from './modalsMenager';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  public static places: any;
  private static placesSubject = new Subject<any>();
  public static rooms: any;
  private static roomsSubject = new Subject<any>();
  public static houses: any;
  private static housesSubject = new Subject<any>();

  static get places$() {
    return this.placesSubject.asObservable();
  }

  static get rooms$() {
    return this.roomsSubject.asObservable();
  }

  static get houses$() {
    return this.housesSubject.asObservable();
  }

  public static async getPlaces(http: HttpClient) {
    return await http.get<any>(`http://localhost:1337/api/places`, { withCredentials: true }).subscribe({
      next: (data) => this.getPlacesSuccess(http, data),
      error: (error) => this.getPlacesError(error),
    });
  }

  private static getPlacesSuccess(http: HttpClient, data: any) {
    MarketplaceService.places = data;
    console.log(data);
    [this.rooms, this.houses] = this.separePlaces();
    console.log({ "Rooms": this.rooms, "Houses": this.houses });

    MarketplaceService.roomsSubject.next(this.rooms);
    MarketplaceService.housesSubject.next(this.houses);

    let i = 0
    for (const place of MarketplaceService.places) {
      this.getOwnerName(http, place.owner, i);
      i++;
    }
  }

  private static async getOwnerName(http: HttpClient, ownerId: string, i: number) {
    http.post<any>(`http://localhost:1337/api/userById`, { userId: ownerId }, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.places[i].ownerName = data.username;
        MarketplaceService.placesSubject.next(this.places);
      },
      error: (error: any) => { },
    });
  }

  private static getPlacesError(error: any) {
    console.log(error);
  }

  private static separePlaces() {
    let r: any = [];
    let h: any = [];
    for (const place of MarketplaceService.places) {
      if (place.type == 'apartment') r.push(place);
      else if (place.type == 'room') h.push(place);
    }
    return [r, h];
  }
}
