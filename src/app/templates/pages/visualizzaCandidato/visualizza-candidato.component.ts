import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, DefaultUrlSerializer, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { RisorseService } from 'src/app/service/risorse.service';
import { Risorse } from 'src/app/model/risorse';
import { DOCUMENT } from '@angular/common';

@Component({
  templateUrl: './visualizza-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.candidati.css', '../../../../assets/css/main.richieste.css']
  
})
export class VisualizzaCandidatoComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public datiCandidato!: Risorse;
  public dettagliCandidato!: any;
  public commentiCandidato!: any;
  public colore!: number;
  opacity = "1";
  public fileBase64!: string;
  public idCandidato!: number;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private defaultService: DefaultComponent,
              private risorseService: RisorseService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Personale' || this.ruolo == 'Dipendente')
        this.router.navigate(["default/pagina-avvisi"]);
      else {
        this.titleService.setTitle("Gestech | Visualizza Candidato");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Visualizza Candidato";
        }, 0)
        this.idCandidato = this.route.snapshot.params['idCandidato'];
        this.getCandidato();
      }
  }

  public getCandidato(): void {
    this.risorseService.getCandidatoVisualizza(this.idCandidato).subscribe(
      (response: any[]) => {
        if (response != null) {
          this.datiCandidato = response[0];
          this.dettagliCandidato = response[1];
          this.commentiCandidato = response[2];
          this.colore = response[3];
          this.fileBase64 = response[4];
          if (this.fileBase64 == "") {
            this.opacity = "0.3";
          }
        }
        else
          this.router.navigate(["candidato-con-trovato"]);
      }
    )
  }

  public eliminaCandidato(): void{
    if (confirm("Sicuro di voler eliminare " + this.datiCandidato.nomeCognome + "?") == true)
      this.risorseService.eliminaCandidato(this.idCandidato).subscribe(
        (response: any) => {
          alert("Candidato eliminato con successo");
          this.router.navigate(["default/pagina-candidati"]);
        }
      )
  }

  public openLinkedin(): void {
    if (this.datiCandidato.profiloLinkedin != "")
      window.open(this.datiCandidato.profiloLinkedin, '_black')
    else
      alert("Nessun link a linkedin trovato");
  }

  public copy(): void {
    navigator.clipboard.writeText(window.location.href);
  }

  public scaricaCV() {
    if (this.fileBase64 != "")
      window.open(this.fileBase64, '_black')
  }
}
