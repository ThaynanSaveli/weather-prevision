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
  loading = true; //variável para exibir o spinner de carregamento

  constructor(private weatherService: WeatherService, private router: Router) { }

  getWheather() {
    let newCities = cities

    // map para adicionar as principais informações do clima para exibir nos cards de cada cidade
    newCities.map((city) => {
      this.weatherService.getTodayWeather(city.latitude, city.longitude).subscribe((response: any) => {
        // pegar o resultado retornado da API, montar o objeto com as principais informações e inserir no objeto weather da cidade no loop
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

    //substituir o array antigo pelo novo array de cidades já com as informações novas de clima
    this.cities = newCities
    // esconder o spinner do usuário
    this.loading = false
  }

  // função para redirecionar para a tela de detalhes da cidade
  handleDetails(city: any) {
    window.location.replace(`/weather-details/${city.routeName}/${city.latitude}/${city.longitude}`)
  }

  ngOnInit(): void {
    //mostrar o spinner para o usuário
    this.loading = true;
    this.getWheather();
  }

}
