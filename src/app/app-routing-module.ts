import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'pages/home',
    component: LandingPage
  },
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
