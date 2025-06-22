import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { Place } from './place/place';

@NgModule({
  declarations: [
    Place
  ],
  imports: [
    CommonModule,
    PlacesRoutingModule
  ]
})
export class PlacesModule { }
