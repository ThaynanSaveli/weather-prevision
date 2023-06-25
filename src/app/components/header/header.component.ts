import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cities } from 'src/app/helpers/cities';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  cities = cities
  selectedCity = ""

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // manter o estado do menu ativo, para aplicar a classe .active no item de menu corretamente
    this.selectedCity = this.route.snapshot.paramMap.get('city') ?? "";
  }
}
