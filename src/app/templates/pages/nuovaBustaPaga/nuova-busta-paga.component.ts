import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './nuova-busta-paga.component.html'
  
})
export class NuovaBustaPagaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo !== 'Personale' && this.ruolo !== 'Admin')
        this.router.navigate(["default/pagina-avvisi"]);
      else{
        this.titleService.setTitle("Gestech | Nuova Busta Paga");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuova Busta Paga";
        }, 0)
      }
  }
}
