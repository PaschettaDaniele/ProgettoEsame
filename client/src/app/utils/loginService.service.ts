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

  static login(http: HttpClient, usernameOrEmail: string, password: string) {
    return http.post<any>(`http://localhost:1337/api/login`, { usernameOrEmail, password }).subscribe(data => {
      console.log(data);
      if (data.ris == "ok") {
        LoginService.isLogged = true;
        LoadingService.hide();
        LoginService.loggedSubject.next(true);
      }
    });
  }
  static register(http: HttpClient, username: string, email: string, password: string, name: string) {
    return http.post<any>(`http://localhost:1337/api/register`, { username, email, password }).subscribe(data => {
      console.log(data);
    });
  }
}
