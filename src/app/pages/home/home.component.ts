import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { Router } from '@angular/router';
import { cities } from '../../helpers/cities';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cities = cities
  loading = true;

  constructor(private weatherService: WeatherService, private router: Router) { }

  getWheather() {
    let newCities = cities

    newCities.map((city) => {
      this.weatherService.getTodayWeather(city.latitude, city.longitude).subscribe((response: any) => {
        let weatherTemp = {
          icon: response.weather[0].icon,
          descricao: response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1),
          temperatura: response.main.temp.toFixed(0),
          minima: response.main.temp_min.toFixed(0),
          maxima: response.main.temp_max.toFixed(0),
          sensacaoTermica: response.main.feels_like.toFixed(0)
        }
        city.weather = weatherTemp
      })
    })

    this.cities = newCities
    this.loading = false
  }

  handleDetails(city: any) {
    window.location.replace(`/weather-details/${city.routeName}/${city.latitude}/${city.longitude}`)
  }

  ngOnInit(): void {
    this.loading = true;
    this.getWheather();
  }

}
