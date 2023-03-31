import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MarketplaceDetailsService } from 'src/app/utils/marketplace-details.service';

@Component({
  selector: 'app-marketplace-details',
  templateUrl: './marketplace-details.component.html',
  styleUrls: ['./marketplace-details.component.css']
})
export class MarketplaceDetailsComponent {
  place: any = undefined;

  constructor() {
    MarketplaceDetailsService.place$.subscribe(place => {
      debugger
      this.place = place;
      console.log(this.place);
    })
  }
}
