import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { CategoryModule } from '../category/category.module';

@NgModule({
  declarations: [
    LayoutComponent //foi importado automaticamente pelo angular ao criar o componente
  ],
  imports: [
    //importações de módulos que serão compartilhados entre os componentes
    CommonModule,
    TemplateRoutingModule,
    CategoryModule
  ]
})
export class TemplateModule { }
