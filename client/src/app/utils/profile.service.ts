import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';
import { ModalMenager } from './modalsMenager';

@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  static profile: {};

  constructor(private http: HttpClient) { }

  public static getProfile(http: HttpClient) {
    return http.get<any>(`http://localhost:1337/api-token/profile`, {withCredentials: true}).subscribe({
      next : (data) => this.getProfileSuccess(data),
      error: (error) => this.getProfileError(error),
    });
  }

  private static getProfileSuccess(data : any){
    console.log(data);
    if (data.ris == "ok") {
      this.profile = data.profile;
    }
    else{
      alert('Autentication error');
      ModalMenager.openLogin('login');
    }
  }

  private static getProfileError(error : any){
    console.log(error);
    alert('Autentication error');
    ModalMenager.openLogin('login');
  }

}
