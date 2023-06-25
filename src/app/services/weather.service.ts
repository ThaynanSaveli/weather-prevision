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

  getTodayWeather(lat: string, lon: string) {
    return this.http.get<any>(`${this.baseUrlToday}appid=${this.apiKey}&units=metric&lang=pt_br&lat=${lat}&lon=${lon}`);
  }

  getNextFourDaysWeather(lat: string, lon: string) {
    return this.http.get<any>(`${this.baseUrlFourDays}appid=${this.apiKey}&units=metric&cnt=32&lang=pt_br&lat=${lat}&lon=${lon}`);
  }
}
