import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ToolbarComponent } from './globalComponents/toolbar/toolbar.component';
import { LoginComponent } from './modals/login/login.component';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './globalComponents/loading/loading.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FooterComponent } from './globalComponents/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardSliderComponent } from './pages/dashboard/dashboard-slider/dashboard-slider.component';
import { MarketplaceCardComponent } from './pages/marketplace/marketplace-card/marketplace-card.component';
import { MarketplaceDetailsComponent } from './pages/marketplace/marketplace-details/marketplace-details.component';
import { DashboardNewComponent } from './pages/dashboard/dashboard-new/dashboard-new.component';
import { DashboardEditComponent } from './pages/dashboard/dashboard-edit/dashboard-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    LoginComponent,
    LoadingComponent,
    MarketplaceComponent,
    ProfileComponent,
    FooterComponent,
    DashboardComponent,
    DashboardSliderComponent,
    MarketplaceCardComponent,
    MarketplaceDetailsComponent,
    DashboardNewComponent,
    DashboardEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
