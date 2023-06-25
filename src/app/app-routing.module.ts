import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WeatherDetaisComponent } from './pages/weather-detais/weather-detais.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather-details/:city/:latitude/:longitude', component: WeatherDetaisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
