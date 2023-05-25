import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DashboardService } from 'src/app/utils/dashboard.service';

@Component({
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.css']
})
export class DashboardEditComponent {

  isEditing: boolean = false;
  selectedPlace: any = null;



  constructor(private httpClient: HttpClient) {
    this.isEditing = DashboardService.isEditing;
    this.selectedPlace = DashboardService.selectedPlace;
  }

  cancel(){
    DashboardService.isEditingSubject.next(false);
  }

  done(){
    DashboardService.updatePlace(this.httpClient, this.selectedPlace);
    DashboardService.isEditingSubject.next(false);
  }

  onFileSelected(e: Event){
    let files: FileList | null = (e.target as HTMLInputElement).files;
    for (let i = 0; i < files!.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files![i]);
      reader.onload = () => {
        this.selectedPlace.images.push(reader.result);
      }
    }
  }

  removeImage(index: number){
    this.selectedPlace.images.splice(index, 1);
  }
}
