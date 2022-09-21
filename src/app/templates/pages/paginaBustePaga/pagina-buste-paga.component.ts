import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-buste-paga.component.html'
  
})
export class PaginaBustePagaComponent implements OnInit{
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
          this.titleService.setTitle("Gestech | Busta Paga");
          setTimeout(() => {
            this.defaultService.titoloPagina=" Busta Paga";
          }, 0)
        }
  }
}
