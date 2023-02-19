import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProfileService } from 'src/app/utils/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile: {};

  constructor(private http: HttpClient) {
    this.profile = ProfileService.getProfile(http);
    console.log(this.profile);
  }
}
