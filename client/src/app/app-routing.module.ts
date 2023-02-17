import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './modals/login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
