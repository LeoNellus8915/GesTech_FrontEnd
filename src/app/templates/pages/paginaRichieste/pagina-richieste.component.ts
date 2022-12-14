import { Component, OnInit } from '@angular/core';
import { RichiesteService } from 'src/app/service/richieste.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { RisorseRichiesteService } from 'src/app/service/risorse-richieste.service';

@Component({
  templateUrl: './pagina-richieste.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
})
export class PaginaRichiesteComponent implements OnInit {
  public listaRichieste!: any[];
  public ruolo = sessionStorage.getItem("ruolo");
  public nomeCognome = sessionStorage.getItem("nomeCognome");
  public idRisorsa = sessionStorage.getItem("idRisorsa") as unknown as number;

  constructor(private risorseRichiesteService: RisorseRichiesteService, private defaultService: DefaultComponent, 
    private titleService: Title, private router: Router, private richiesteService: RichiesteService) { }

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else
      if (this.ruolo === 'Dipendente' || this.ruolo === 'Personale')
        this.router.navigate(['default/pagina-avvisi'])
      else {
        this.titleService.setTitle("Gestech | Richieste");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Richieste";
        }, 0)
        this.getRichieste();
      }
  }

  public getRichieste(): void {
    this.richiesteService.getRichiesteAperte(this.ruolo as string, this.nomeCognome as string, this.idRisorsa).subscribe(
      (response: any[]) => {
        this.listaRichieste = response;
      }
    )
  }

  public goVisualizzaRichiesta(idRichiesta: number, visualizzata: boolean): void {
    if (visualizzata == false)
      this.risorseRichiesteService.setVisualizzato(idRichiesta, this.idRisorsa as unknown as number).subscribe (
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