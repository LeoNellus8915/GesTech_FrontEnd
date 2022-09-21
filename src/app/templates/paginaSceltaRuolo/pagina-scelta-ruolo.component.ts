import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  templateUrl: './pagina-scelta-ruolo.component.html',
  styleUrls: ['../../../assets/css/main.login.css']
  
})
export class PaginaSceltaRuoloComponent implements OnInit{
  public ruolo!: string;
  public listaRuoli!: string[];
  public titoloPagina: any;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.ruolo = this.route.snapshot.params['ruolo'];
    if (this.ruolo == null)
      this.router.navigate([""]);
    else {
      this.listaRuoli = this.ruolo.replace(/["]/g,'').replace("[",'').replace("]",'').split(',');
      
    }
  }

  public sceltaRuolo(ruolo: string): void {
    sessionStorage.setItem("ruolo", ruolo);
    this.router.navigate(["default/pagina-avvisi"]);
  }
}
