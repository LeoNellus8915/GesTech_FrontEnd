import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-rapportino.component.html'
})
export class PaginaRapportinoComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
  }
}
