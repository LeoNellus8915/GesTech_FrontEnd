import { Component, OnInit } from '@angular/core';
import { RichiesteService } from 'src/app/service/richieste.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { allRichiesteChiuse } from 'src/app/model/mapper/allRichiesteChiuse';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './pagina-storico-richieste.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
})
export class PaginaStoricoRichiesteComponent implements OnInit {
  public listaRichieste!: allRichiesteChiuse[];
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public nomeCognome = sessionStorage.getItem("nomeCognome") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;

  constructor(private defaultService: DefaultComponent, private titleService: Title, private router: Router, 
            private richiesteService: RichiesteService) { }

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin' 
          || this.ruolo === 'Account' 
          || this.ruolo === 'Direttore Commerciale'
          || this.ruolo === 'Direttore Recruiter'){
            this.titleService.setTitle("Gestech | Storico Richieste");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Storico Richieste";
        }, 0)
        this.getRichieste();
          }
      else {
        this.router.navigate(['default/pagina-avvisi'])
      }
  }

  public getRichieste(): void {
    this.richiesteService.getRichiesteChiuse(this.ruolo, this.nomeCognome, this.idDipendente).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaRichieste = response.dataSource;
        }
      }
    )
  }
}