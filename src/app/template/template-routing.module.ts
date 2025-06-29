import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categories',
        // lazy loading para o carregamento das rotas do category na tela do template (/pages/categories)
        loadChildren: () => import('../category/category.module').then(m => m.CategoryModule),
        pathMatch: 'full',
        data: { titulo: 'Categorias', subTitulo: 'Realize o cadastro de novas categorias' },
      },
      {
        path: 'places',
        loadChildren: () => import('../places/places.module').then(m => m.PlacesModule),
        pathMatch: 'full',
        data: { titulo: 'Lugares', subTitulo: 'Realize o cadastro de novos lugares' },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
