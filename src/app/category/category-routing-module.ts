import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Category } from './category/category';

const routes: Routes = [
  {
    path: '',
    component: Category
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
