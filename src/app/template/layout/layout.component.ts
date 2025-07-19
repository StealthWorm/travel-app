import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutProps } from './layoutProps';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  pageProps: LayoutProps = {
    titulo: '',
    subtitulo: ''
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    // Observar mudanças de rota para atualizar o título
    // pipe é um operador que permite que o Observable seja transformado
    // NavigationEnd é um evento que é disparado quando a rota é alterada
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.updatePageInfo();
    });

    // Configurar informações iniciais
    this.updatePageInfo();
  }

  private updatePageInfo(): void {
    // Pegar a rota ativa mais profunda (child route)
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    // Acessar os dados da rota
    route.data.subscribe(data => {
      this.pageProps.titulo = data['titulo'] || '';
      this.pageProps.subtitulo = data['subTitulo'] || '';
      this.titleService.setTitle(`${this.pageProps.titulo} - ${this.pageProps.subtitulo}`);
    });
  }
}