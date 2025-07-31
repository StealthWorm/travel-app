import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './landing-page/landing-page';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'pages/home',
    component: LandingPage
  },
  {
    path: 'pages',
    // lazy loading para o carregamento das rotas do template na tela principal (/pages)
    loadChildren: () => import('./template/template.module').then(m => m.TemplateModule),
    canActivate: [authGuard] // protege a rota template pelo authGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
