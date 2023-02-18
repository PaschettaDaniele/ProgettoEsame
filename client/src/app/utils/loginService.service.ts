import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static logged: boolean = false;

  constructor(private http: HttpClient) { }
  static login(http: HttpClient, usernameOrEmail: string, password: string) {
    return http.post<any>(`http://localhost:1337/api/login`, { usernameOrEmail, password }).subscribe(data => {
      console.log(data);
      if (data.ris == "ok") {
        LoginService.logged = true;
      }
    });
  }
  static register(http: HttpClient, username: string, email: string, password: string, name: string) {
    return http.post<any>(`http://localhost:1337/api/register`, { username, email, password }).subscribe(data => {
      console.log(data);
    });
  }
}
