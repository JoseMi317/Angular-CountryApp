
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountriePageComponent } from './pages/countrie-page/countrie-page.component';



const Routes : Routes = [
  {
    path: 'by-capital',
    component: ByCapitalPageComponent,
  },
  {
    path: 'by-country',
    component: ByCountryPageComponent,
  },
  {
    path: 'by-region',
    component: ByRegionPageComponent,
  },
  {
    path: 'countries/by/:id',
    component: CountriePageComponent,
  },
  {
    path: '**',
    redirectTo: 'by-capital'

  }
]

@NgModule({
  imports: [
    RouterModule.forChild(Routes)
  ],

  exports: [
    RouterModule
  ],

})

export class CountriesRounting { }


