import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-ccnl.component.html'
  
})
export class PaginaCCNLComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Dipendente'){
        this.titleService.setTitle("Gestech | CCNL");
        setTimeout(() => {
          this.defaultService.titoloPagina=" CCNL";
        }, 0)
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }
}
