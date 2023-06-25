import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrlToday = environment.baseUrlToday;
  baseUrlFourDays = environment.baseUrlFourDays;
  apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  //consumo da API para pegar os dados atuais do clima
  getTodayWeather(lat: string, lon: string) {
    return this.http.get<any>(`${this.baseUrlToday}appid=${this.apiKey}&units=metric&lang=pt_br&lat=${lat}&lon=${lon}`);
  }

  //consumo da API para pegar a previsão dos póximos dias
  getNextFourDaysWeather(lat: string, lon: string) {
    return this.http.get<any>(`${this.baseUrlFourDays}appid=${this.apiKey}&units=metric&cnt=32&lang=pt_br&lat=${lat}&lon=${lon}`);
  }
}
