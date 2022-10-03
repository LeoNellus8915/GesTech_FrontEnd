import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { CandidatiService } from 'src/app/service/candidati.service';
import { Candidati } from 'src/app/model/candidati';
import { DOCUMENT } from '@angular/common';
import { allCommentiCandidato } from 'src/app/model/mapper/allCommentiCandidato';

@Component({
  templateUrl: './visualizza-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.candidati.css', '../../../../assets/css/main.richieste.css']
  
})
export class VisualizzaCandidatoComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public datiCandidato!: Candidati;
  public dettagliCandidato!: any;
  public commentiCandidato!: allCommentiCandidato[];
  public colore!: number;
  opacity = "1";
  public fileBase64!: string;
  public idCandidato!: number;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private defaultService: DefaultComponent,
              private candidatiService: CandidatiService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
    if (this.ruolo == 'Admin' || this.ruolo == 'Recruiter' || this.ruolo == 'Direttore Recruiter' 
    || this.ruolo == 'Direttore Commerciale'){
      this.titleService.setTitle("Gestech | Visualizza Candidato");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Visualizza Candidato";
      }, 0)
      this.idCandidato = this.route.snapshot.params['idCandidato'];
      this.getCandidato();
    }
      else {
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public getCandidato(): void {
    this.candidatiService.getCandidatoVisualizza(this.idCandidato).subscribe(
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
      this.candidatiService.eliminaCandidato(this.idCandidato).subscribe(
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