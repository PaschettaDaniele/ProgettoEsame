import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../utils/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnDestroy {
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor() {
    this.loadingSubscription = LoadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
