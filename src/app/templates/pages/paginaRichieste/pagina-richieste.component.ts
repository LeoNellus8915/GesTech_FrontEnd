import { Component, OnInit } from '@angular/core';
import { RichiesteService } from 'src/app/service/richieste.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { DipendentiRichiesteService } from 'src/app/service/dipendenti-richieste.service';

@Component({
  templateUrl: './pagina-richieste.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
})
export class PaginaRichiesteComponent implements OnInit {
  public listaRichieste!: any[];
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public nomeCognome = sessionStorage.getItem("nomeCognome") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;

  constructor(private dipendentiRichiesteService: DipendentiRichiesteService, private defaultService: DefaultComponent, 
    private titleService: Title, private router: Router, private richiesteService: RichiesteService) { }

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else
    if (this.ruolo === 'Account' || this.ruolo === 'Recruiter' || this.ruolo === 'Direttore Recruiter'
    || this.ruolo === 'Direttore Commerciale'){
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
    this.richiesteService.getRichiesteAperte(this.ruolo, this.nomeCognome, this.idDipendente).subscribe(
      (response: any[]) => {
        const candidati: string[][] = [];
        this.listaRichieste = response[1];
        const listaCodici = response[0];
        for (let i = 0; i < response[0].length; i++) {
          this.listaRichieste[i][0] = listaCodici[i].codice;
        }
      }
    )
  }

  public goVisualizzaRichiesta(idRichiesta: number, visualizzata: boolean): void {
    if (visualizzata == false)
      this.dipendentiRichiesteService.setVisualizzato(idRichiesta, this.idDipendente).subscribe (
        (response: any) => {
          this.defaultService.numeroRichieste --;
          sessionStorage.setItem("numeroRichieste", this.defaultService.numeroRichieste.toString())
          this.router.navigate(["default/pagina-visualizza-richiesta", idRichiesta, 0]);
        }
      )
    else
      this.router.navigate(["default/pagina-visualizza-richiesta", idRichiesta, 0]);
  }
}