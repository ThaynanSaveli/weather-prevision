import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { cities } from '../../helpers/cities';
import { getTodayDay, mpsToKmph } from '../../helpers/functions';

@Component({
  selector: 'app-weather-detais',
  templateUrl: './weather-detais.component.html',
  styleUrls: ['./weather-detais.component.css']
})
export class WeatherDetaisComponent {
  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }

  city = cities.filter((city) => city.routeName === this.route.snapshot.paramMap.get('city'))[0]
  extraInfosCity: any = {}
  arrayPrevision: any = []
  loading = true

  async getInfosWheather() {
    await this.weatherService.getTodayWeather(this.city.latitude, this.city.longitude).subscribe((response: any) => {

      let weatherTemp = {
        icon: response.weather[0].icon,
        descricao: response.weather[0].description.charAt(0).toUpperCase() + response.weather[0].description.slice(1),
        temperatura: response.main.temp.toFixed(0),
        minima: response.main.temp_min.toFixed(0),
        maxima: response.main.temp_max.toFixed(0),
        sensacaoTermica: response.main.feels_like.toFixed(0)
      }

      response.wind.speed = mpsToKmph(response.wind.speed).toFixed(0)
      response.visibility = response.visibility / 1000

      this.extraInfosCity = response
      this.city.weather = weatherTemp
    })

    await this.weatherService.getNextFourDaysWeather(this.city.latitude, this.city.longitude).subscribe((response: any) => {
      let dayMap: number = 0;

      response.list.map((item: any) => {
        let today = getTodayDay();
        let day = new Date(item.dt_txt).getDay()

        if (day !== today && day !== dayMap) {
          dayMap = new Date(item.dt_txt).getDay()
          item.dt_txt = new Date(item.dt_txt).toLocaleDateString('pt-BR')
          this.arrayPrevision.push(item)
        }
      })

      this.loading = false
    })
  }

  getWindDirection(deg: number) {
    return {
      transform: `rotate(${deg}deg)`
    }
  }

  ngOnInit(): void {
    this.loading = true
    this.getInfosWheather();
  }
}
