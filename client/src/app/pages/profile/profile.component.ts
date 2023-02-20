import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProfileService } from 'src/app/utils/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile: any;
  profileSubscription: any;
  email: string | null = "";

  constructor(private http: HttpClient) {
    this.email = localStorage.getItem('usernameOrEmail');
    ProfileService.getProfile(this.http, this.email);
    this.profileSubscription = ProfileService.profile$.subscribe((profile: any) => {
      this.profile = profile;
      console.log(this.profile);
    });
  }

  editProfile() {

  }
}
