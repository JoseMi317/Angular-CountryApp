import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-countrie-page',
  templateUrl: './countrie-page.component.html',
  styles: ``
})
export class CountriePageComponent implements OnInit {

  public country? : Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService : CountryService,
  ){}


  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(  ({id}) => this.countriesService.seachCountryByAlphaCode(id)  )
      )
      .subscribe( ( country ) => {
        if(!country) return this.router.navigateByUrl('');

          return this.country = country;

      });
  }

}
