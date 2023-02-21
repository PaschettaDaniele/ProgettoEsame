import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';
import { ModalMenager } from './modalsMenager';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  static profile: {};
  static profileSubject: Subject<any> = new Subject<any>();

  static get profile$() {
    return this.profileSubject.asObservable();
  }

  constructor(private http: HttpClient) { }

  //#region  getProfile
  public static getProfile(http: HttpClient, usernameOrEmail: string | null) {
    return http.post<any>(`http://localhost:1337/api-token/profile`, { usernameOrEmail }, { withCredentials: true }).subscribe({
      next: (data) => this.getProfileSuccess(data),
      error: (error) => this.getProfileError(error),
    });
  }

  private static getProfileSuccess(data: any) {
    if (data.ris == "ok") {
      this.profileSubject.next(data.profile);
      this.profile = data.profile;
    }
    else alert(data.error);
  }

  private static getProfileError(error: any) {
    console.log(error);
    alert('Autentication error');
    ModalMenager.openLogin('login');
  }
  //#endregion

  //#region updateProfile

  public static updateProfile(http: HttpClient, profile: any) {
    return http.post<any>(`http://localhost:1337/api-token/update-profile`, profile, { withCredentials: true }).subscribe({
      next: (data) => this.updateProfileSuccess(data),
      error: (error) => this.updateProfileError(error),
    });
  }

  private static updateProfileSuccess(data: any) {}

  private static updateProfileError(error: any) {}

  // #endregion
}
