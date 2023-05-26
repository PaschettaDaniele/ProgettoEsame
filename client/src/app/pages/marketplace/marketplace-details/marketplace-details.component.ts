import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { placeModel } from 'src/app/models/place.model';
import { userModel } from 'src/app/models/user.model';
import { MarketplaceService } from 'src/app/utils/marketplace.service';

@Component({
  selector: 'app-marketplace-details',
  templateUrl: './marketplace-details.component.html',
  styleUrls: ['./marketplace-details.component.css']
})
export class MarketplaceDetailsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  place?: placeModel;
  placeObserved: any;
  window: Window = window;

  showMap: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        MarketplaceService.getPlace(this.http, params['id'])
        this.placeObserved = MarketplaceService.place$.subscribe((value) => {
          if (value) {
            this.place = value;
            this.isLoading = false;
            console.log(this.place)
          } else {
            this.isLoading = false;

          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.placeObserved.unsubscribe();
  }

  @HostListener('window:scroll', ['$event']) windowScroll($event: any) {
    this.window = window;
  }
}
