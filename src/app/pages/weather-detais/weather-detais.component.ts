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

  // variável para pegar as informações da cidade
  city = cities.filter((city) => city.routeName === this.route.snapshot.paramMap.get('city'))[0]
  extraInfosCity: any = {} // variável para exibir as informaçõs de clima completas que não tinham na home
  arrayPrevision: any = [] // array com as previsões do tempo para os próximos 4 dias
  loading = true

  async getInfosWheather() {
    // API para pegar as informações atuais do clima
    await this.weatherService.getTodayWeather(this.city.latitude, this.city.longitude).subscribe((response: any) => {
      // pegar o resultado retornado da API, montar o objeto com as principais informações e inserir no objeto weather da cidade posteriormente
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

    // API para pegar as previsões para os próximos 4 dias
    await this.weatherService.getNextFourDaysWeather(this.city.latitude, this.city.longitude).subscribe((response: any) => {
      /* 
        como a API retorna 5 dias de previsão de vários horários durante o dia, criei essa variável para verificar
        o dia do item que está sendo analisado no map abaixo, para pegar as informações do primeiro horário retornado para
        aquele dia, e evitar que as informações se sobreponham
      */      
      let dayMap: number = 0;

      // loop nos resultados retornados pela API
      response.list.map((item: any) => {
        // variável temporária para verificar o dia de hoje, pois já mostramos acima as informações do dia de hoje
        /* 
          não usei as informações de agora desta API na parte de cima para manter a consistência dos dados que são exibidos 
          na home, pois nesta API, o retorno é baseado em algumas horas do dia (00h 09h 12h por exemplo), e por isso as informações podem variar de uma hora
          para a outra, o que ocasionaria dados diferentes da home.
        */
        let today = getTodayDay();
        let day = new Date(item.dt_txt).getDay() // variável para identificar o dia da data do item neste loop

        /* 
          verifico se o dia do item é diferente do dia de hoje (motivo explicado acima) e também se o dia é diferente do dayMap 
          ou seja, se as informações do dia da data do item já foram obtidos.

          Caso não tenha a previsão daquele dia ainda, entra no IF, coloco o dayMap com o valor do dia do item e adiciono o item
          no array de previsões (que no final vai ter 4 itens, que são os próximos 4 dias)
        */
        if (day !== today && day !== dayMap) {
          dayMap = new Date(item.dt_txt).getDay()
          item.dt_txt = new Date(item.dt_txt).toLocaleDateString('pt-BR')
          this.arrayPrevision.push(item)
        }
      })

      this.loading = false //remoção do spinner da tela
    })
  }

  //função para aplicar a rotação da seta que indica a direção do vento, onde é passada a variável 'deg' que é a angulação que será aplicada no rotate
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
