import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class URLService {
  public static URL = window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]
  public static aggiornaURL() {
    let protocol = window.location.href.split('/')[0];
    let host = window.location.href.split('/')[2];
    if (host == 'localhost:4200')
      switch (protocol) {
        case 'http:':
          host = 'localhost:1337';
          break;
        case 'https:':
          host = 'localhost:1338';
          break;
      }
    this.URL = protocol + '//' + host;
    return this.URL;
  }
}
