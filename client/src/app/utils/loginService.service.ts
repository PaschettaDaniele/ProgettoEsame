import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';
import { ProfileService } from './profile.service';
import { URLService } from './URLService.service';

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
    return http.post<any>(`${URLService.aggiornaURL()}/api-token/checkToken`, {}, { withCredentials: true }).subscribe(data => {
      LoginService.isLogged = (data.ris == "ok");
      LoginService.loggedSubject.next(LoginService.isLogged);
    });
  }

  //#region Login service
  static login(http: HttpClient, usernameOrEmail: string, password: string) {
    return http.post<any>(`${URLService.aggiornaURL()}/api/login`, { usernameOrEmail, password }, { withCredentials: true }).subscribe({
      next: (data) => this.loginSuccess(data, usernameOrEmail),
      error: (error) => this.loginError(error),
    });
  }

  private static loginSuccess(data: any, usernameOrEmail: string) {
    console.log(data);
    if (data.ris == "ok") {
      LoginService.isLogged = true;
      LoadingService.hide();
      LoginService.loggedSubject.next(true);
      localStorage.setItem('usernameOrEmail', usernameOrEmail);
    }
    else {
      LoginService.isLogged = false;
      LoadingService.hide();
      LoginService.loggedSubject.next(false);
      alert('Autentication error');
    }
  }

  private static loginError(error: any) {
    console.log(error);
    LoginService.isLogged = false;
    LoadingService.hide();
    LoginService.loggedSubject.next(false);
    alert('Autentication error');
  }
  //#endregion

  //#region Register service
  static register(http: HttpClient, username: string, email: string, password: string, name: string) {
    return http.post<any>(`${URLService.aggiornaURL()}/api/register`, { username, email, password, name }, { withCredentials: true }).subscribe({
      next: data => this.registerSuccess(data, username),
      error: e => this.registerError(e)
    });
  }

  private static registerSuccess(data: any, username: string) {
    LoginService.isLogged = true;
    LoadingService.hide();
    LoginService.loggedSubject.next(true);
    localStorage.setItem('usernameOrEmail', username)
  }

  private static registerError(e: any) {
    LoginService.isLogged = false;
    LoginService.loggedSubject.next(false);
    alert('Registration error');
  }

  //#endregion

  //#region Logout service
  static logout(http: HttpClient) {
    return http.post<any>(`${URLService.aggiornaURL()}/api/logout`, {}, { withCredentials: true }).subscribe({
      next: (data) => this.logoutSuccess(data),
      error: (error) => this.logoutError(error),
    });
  }

  private static logoutSuccess(data: any) {
    console.log(data);
    LoginService.isLogged = false;
    LoginService.loggedSubject.next(false);
    ProfileService.profile = {};
    localStorage.removeItem('usernameOrEmail');
  }

  private static logoutError(error: any) {
    console.log(error);
    alert('Error on logout, user still logged in');
  }
  //#endregion


}
