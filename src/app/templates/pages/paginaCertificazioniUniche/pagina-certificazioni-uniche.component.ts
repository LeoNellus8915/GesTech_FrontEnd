import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-certificazioni-uniche.component.html'
  
})
export class PaginaCertificazioniUnicheComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
  else
    if (this.ruolo == 'Dipendente'){
      this.titleService.setTitle("Gestech | Certificazione Unica");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Certificazione Unica";
      }, 0)
    }
    else {
      this.router.navigate(["default/pagina-avvisi"]);
    }
  }
}