import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public static isLoading: boolean = false;
  private static loadingSubject: Subject<boolean> = new Subject<boolean>();

  static get loading$() {
    return this.loadingSubject.asObservable();
  }

  public static show() {
    this.isLoading = true;
    this.loadingSubject.next(true);
  }

  public static hide() {
    this.isLoading = false;
    this.loadingSubject.next(false);
  }
}
