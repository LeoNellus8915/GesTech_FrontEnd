import { Component, OnInit } from '@angular/core';
import { RichiesteService } from 'src/app/service/richieste.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-storico-richieste.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
})
export class PaginaStoricoRichiesteComponent implements OnInit {
  public listaRichieste!: any[];
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public nomeCognome = sessionStorage.getItem("nomeCognome") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;

  constructor(private defaultService: DefaultComponent, private titleService: Title, private router: Router, 
            private richiesteService: RichiesteService) { }

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else
      if (this.ruolo === 'Dipendente' || this.ruolo === 'Personale')
        this.router.navigate(['default/pagina-avvisi'])
      else {
        this.titleService.setTitle("Gestech | Storico Richieste");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Storico Richieste";
        }, 0)
        this.getRichieste();
      }
  }

  public getRichieste(): void {
    this.richiesteService.getRichiesteChiuse(this.ruolo, this.nomeCognome, this.idDipendente).subscribe(
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
}