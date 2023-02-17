import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  static login(http: HttpClient,usernameOrEmail: string, password: string) {
    return http.post<any>(`http://localhost:1337/api/login`, { usernameOrEmail, password }).subscribe(data => {
      console.log(data);
    });
  }
  static register(http: HttpClient, username: string, email: string, password: string, password2: string) {
    return http.post<any>(`http://localhost:1337/api/register`, { username, email, password}).subscribe(data => {
      console.log(data);
    });
  }
}
