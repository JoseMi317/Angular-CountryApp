import { Country } from './../interfaces/country';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})

export class CountryService {

  private apiUrl : string = 'https://restcountries.com/v3.1'

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion:  {region: '', countries: []},
  }


  constructor(private http: HttpClient) {
    this.LoadFromLocalSotrage();
   }

  private SaveToLocalStorage (){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }

  private LoadFromLocalSotrage(){
    if(!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest (url : string) : Observable <Country[]>{
    return this.http.get<Country[]>(url)
      .pipe(
        catchError ( () => of([])),
    );
  }

  seachCountryByAlphaCode(code:string): Observable <Country | null>  {

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url)
    .pipe(
      map(countries => countries.length > 0 ? countries[0]:null),
      catchError ( error => of(null))
    );
  }

  searchCapital(term :  string): Observable <Country[]> {

    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {term, countries}),
        tap( () => this.SaveToLocalStorage())
      )
  }

  searchCountry (term : string): Observable <Country[]>{
    const url =  `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url).pipe(
      tap( countries => this.cacheStore.byCountry = {term, countries}),
      tap( () => this.SaveToLocalStorage())
    )
  }

  searchRegion (region : Region): Observable <Country[]>{
    const url =  `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap( countries => this.cacheStore.byRegion = {region, countries}),
        tap( () => this.SaveToLocalStorage())
      )
   }
}
