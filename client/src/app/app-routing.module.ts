import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './modals/login/login.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardNewComponent } from './pages/dashboard/dashboard-new/dashboard-new.component';
import { MarketplaceDetailsComponent } from './pages/marketplace/marketplace-details/marketplace-details.component';
import { DashboardEditComponent } from './pages/dashboard/dashboard-edit/dashboard-edit.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "marketplace", component: MarketplaceComponent, pathMatch: "full" },
  { path: "marketplace/details/:id", component: MarketplaceDetailsComponent },
  { path: "profile", component: ProfileComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: 'new', component: DashboardNewComponent },
      { path: 'edit', component: DashboardEditComponent}
    ]
  },
  { path: "marketplace/details", component: MarketplaceDetailsComponent },
  { path: "profile", component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
