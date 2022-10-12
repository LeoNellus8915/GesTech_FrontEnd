import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-modulistica.component.html'
  
})
export class PaginaModulisticaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
    this.router.navigate([""]);
  else
    if (this.ruolo == 'Dipendente'){
      this.titleService.setTitle("Gestech | Modulistica");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Modulistica";
      }, 0)
    }
    else {
      this.router.navigate(["default/pagina-avvisi"]);
    }      
  }
}