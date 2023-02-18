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

  static checkLogin(){
    this.loggedSubject.next(localStorage.getItem('token') ? true : false);
    this.isLogged = localStorage.getItem('token') ? true : false;
  }
  static login(http: HttpClient, usernameOrEmail: string, password: string) {
    return http.post<any>(`http://localhost:1337/api/login`, { usernameOrEmail, password }).subscribe(data => {
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
        alert('Errore di autenticazione');
      }
    });
  }
  static register(http: HttpClient, username: string, email: string, password: string, name: string) {
    return http.post<any>(`http://localhost:1337/api/register`, { username, email, password }).subscribe(data => {
      console.log(data);
    });
  }

  static logout(http: HttpClient) {
    LoginService.isLogged = false;
    LoginService.loggedSubject.next(false);
    return http.post<any>(`http://localhost:1337/api/logout`, {}).subscribe(data => {
      console.log(data);
    });
  }
}
