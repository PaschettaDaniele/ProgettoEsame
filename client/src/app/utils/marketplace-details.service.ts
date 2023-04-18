import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceDetailsService {
  private static placeSubject: Subject<any> = new Subject<any>();

  constructor() { }

  static get place$() {
    return this.placeSubject.asObservable()
  }

  static show(place: any) {
    this.placeSubject.next(place)
  }

  static hide() {
    location.href = "/marketplace";
    this.placeSubject.next(null)
  }

}
