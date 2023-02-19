import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static isLogged: boolean = false;
  private static loggedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  static get logged$() {
    return this.loggedSubject.asObservable();
  }

  static checkLogin(http: HttpClient) {
    return http.post<any>(`http://localhost:1337/api-token/checkToken`, {}).subscribe(data => {
      LoginService.isLogged = (data.ris == "ok");
      LoginService.loggedSubject.next(LoginService.isLogged);
    });
  }

  //#region Login service
  static login(http: HttpClient, usernameOrEmail: string, password: string) {
    return http.post<any>(`http://localhost:1337/api/login`, { usernameOrEmail, password }, {withCredentials: true}).subscribe({
      next : (data) => this.loginSuccess(data),
      error: (error) => this.loginError(error),
    });
  }

  private static loginSuccess(data : any){
    console.log(data);
    if (data.ris == "ok") {
      LoginService.isLogged = true;
      LoadingService.hide();
      LoginService.loggedSubject.next(true);
      localStorage.setItem('token', data.token);
    }
    else{
      LoginService.isLogged = false;
      LoadingService.hide();
      LoginService.loggedSubject.next(false);
      alert('Autentication error');
    }
  }

  private static loginError(error : any){
    console.log(error);
    LoginService.isLogged = false;
    LoadingService.hide();
    LoginService.loggedSubject.next(false);
    alert('Autentication error');
  }
  //#endregion

  //#region Register service
  static register(http: HttpClient, username: string, email: string, password: string, name: string) {
    return http.post<any>(`http://localhost:1337/api/register`, { username, email, password }, {withCredentials: true}).subscribe(data => {
      console.log(data);
    });
  }
  //#endregion

  //#region Logout service
  static logout(http: HttpClient) {
    return http.post<any>(`http://localhost:1337/api/logout`, {}, {withCredentials: true}).subscribe({
      next : (data) => this.logoutSuccess(data),
      error: (error) => this.logoutError(error),
    });
  }

  private static logoutSuccess(data : any) {
    console.log(data);
    LoginService.isLogged = false;
    LoginService.loggedSubject.next(false);
  }

  private static logoutError(error : any) {
    console.log(error);
    alert('Error on logout, user still logged in');
  }
  //#endregion


}
