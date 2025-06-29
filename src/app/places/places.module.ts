import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacesRoutingModule } from './places-routing.module';
import { PlaceComponent } from './place/place.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PlaceComponent
  ],
  imports: [
    CommonModule,
    PlacesRoutingModule,
    ReactiveFormsModule // diferente do FormsModule, o ReactiveFormsModule é mais flexível e permite criar formulários reativos
  ]
})
export class PlacesModule { }
