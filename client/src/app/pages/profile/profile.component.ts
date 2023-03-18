import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoadingService } from 'src/app/utils/loading.service';
import { ProfileService } from 'src/app/utils/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile: any = {};
  profileSubscription: any;
  email: string | null = "";
  isLoading: boolean = true;
  isEditing: boolean = false;
  imageChanged: boolean = false;

  nameEdit: string = "";
  usernameEdit: string = "";
  emailEdit: string = "";

  constructor(private http: HttpClient) {
    LoadingService.show();
    this.email = localStorage.getItem('usernameOrEmail');
    ProfileService.getProfile(this.http, this.email);
    this.profileSubscription = ProfileService.profile$.subscribe((profile: any) => {
      this.profile = profile;
      this.nameEdit = profile.name;
      this.usernameEdit = profile.username;
      this.emailEdit = profile.email;
      LoadingService.hide();
      this.isLoading = false;
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  updateData() {
    this.isEditing = false;
    this.profile.name = this.nameEdit;
    this.profile.username = this.usernameEdit;
    this.profile.email = this.emailEdit;
    this.profile.imageChanged = this.imageChanged;
    ProfileService.updateProfile(this.http, this.profile);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // get the file in base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.profile.image = reader.result;
        this.imageChanged = true;
      }
    }
  }

  cancelEdit() {
    this.isEditing = false;
  }
}
