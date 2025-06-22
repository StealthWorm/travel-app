import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule // diferente do FormsModule, o ReactiveFormsModule é mais flexível e permite criar formulários reativos
  ]
})
export class CategoryModule { }
