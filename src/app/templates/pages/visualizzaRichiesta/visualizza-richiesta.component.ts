import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { RichiesteService } from 'src/app/service/richieste.service';
import { StatiRichiesta } from 'src/app/model/stati_richiesta';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './visualizza-richiesta.component.html',
  styleUrls: ['../../../../assets/css/main.home.css', '../../../../assets/css/main.richieste.css']
  
})
export class VisualizzaRichiestaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public idRichiesta!: number;
  public statoPagina!: number;
  public richiesta!: any[];
  public statoRichiesta!: string;
  public idStatoRichiesta!: number;
  public listaStatiRichiesta!: StatiRichiesta[];
  public commentiRichiesta!: any[];
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent,
              private route: ActivatedRoute, private richiesteService: RichiesteService) {}

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else
      if (this.ruolo === 'Dipendente' || this.ruolo === 'Personale')
        this.router.navigate(['default/pagina-avvisi'])
      else {
        this.titleService.setTitle("Gestech | Visualizza Richiesta");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Visualizza Richiesta";
        }, 0)
        this.idRichiesta = this.route.snapshot.params['idRichiesta'];
        this.statoPagina = this.route.snapshot.params['statoPagina'];
        this.getRichiesta();
      }
  }

  public getRichiesta(): void {
    this.richiesteService.getRichiesta(this.idRichiesta, this.statoPagina).subscribe(
      (response: any[]) => {
        this.richiesta = response[0];
        this.statoRichiesta = response[1];
        this.idStatoRichiesta = response[2];
        this.listaStatiRichiesta = response[3];
        this.commentiRichiesta = response[4];
      }
    )
  }

  public eliminaRichiesta(): void {
    if (confirm("Sicuro di voler eliminare questa richista?") == true)
      this.richiesteService.eliminaRichiesta(this.idRichiesta, this.statoPagina).subscribe(
        (response: any) => {
          alert("Richiesta eliminata con successo");
          if (this.statoPagina == 0)
            this.router.navigate(['default/pagina-richieste']);
          else
            this.router.navigate(['default/pagina-storico-richieste']);
        }
      )
  }

  public updateRichiesta(updateForm: NgForm): void {
    if (updateForm.value.statoRichiesta == "")
    updateForm.value.statoRichiesta = this.idStatoRichiesta;
    this.richiesteService.updateRichiesta(updateForm.value, this.idRichiesta, this.idDipendente, this.statoPagina).subscribe(
      (response: any) => {
        alert("Richiesta aggiornata con successo");
        if (this.statoPagina == 0)
          this.router.navigate(['default/pagina-richieste']);
        else
          this.router.navigate(['default/pagina-storico-richieste']);
      }
    )
  }
}
