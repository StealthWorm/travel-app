import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing-module';
import { Category } from './category/category';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Category
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule // diferente do FormsModule, o ReactiveFormsModule é mais flexível e permite criar formulários reativos
  ]
})
export class CategoryModule { }
