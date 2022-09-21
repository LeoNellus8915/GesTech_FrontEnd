import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-certificazioni-uniche.component.html'
  
})
export class PaginaCertificazioniUnicheComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Commerciale' || this.ruolo == 'Recruiter')
        this.router.navigate(["default/pagina-avvisi"]);
      else {
        this.titleService.setTitle("Gestech | Certificazione Unica");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Certificazione Unica";
        }, 0)
      }
  }
}
