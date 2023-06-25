import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetaisComponent } from './weather-detais.component';

describe('WeatherDetaisComponent', () => {
  let component: WeatherDetaisComponent;
  let fixture: ComponentFixture<WeatherDetaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherDetaisComponent]
    });
    fixture = TestBed.createComponent(WeatherDetaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
