import { Component, OnInit } from '@angular/core';
import { RichiesteService } from 'src/app/service/richieste.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { RisorseRichiesteService } from 'src/app/service/risorse-richieste.service';

@Component({
  templateUrl: './pagina-storico-richieste.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
})
export class PaginaStoricoRichiesteComponent implements OnInit {
  public listaRichieste!: any[];
  public ruolo = sessionStorage.getItem("ruolo");
  public nomeCognome = sessionStorage.getItem("nomeCognome");
  public idRisorsa = sessionStorage.getItem("idRisorsa") as unknown as number;

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
    this.richiesteService.getRichiesteChiuse(this.ruolo as string, this.nomeCognome as string, this.idRisorsa).subscribe(
      (response: any[]) => {
        this.listaRichieste = response;
      }
    )
  }
}