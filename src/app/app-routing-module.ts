import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pages',
    // lazy loading para o carregamento das rotas do template na tela principal (/pages)
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
