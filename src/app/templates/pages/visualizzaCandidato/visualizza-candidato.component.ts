import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { CandidatiService } from 'src/app/service/candidati.service';
import { Candidati } from 'src/app/model/candidati';
import { DOCUMENT } from '@angular/common';
import { allCommentiCandidato } from 'src/app/model/mapper/allCommentiCandidato';
import { Persone } from 'src/app/model/persone';

@Component({
  templateUrl: './visualizza-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.candidati.css', '../../../../assets/css/main.richieste.css']
  
})
export class VisualizzaCandidatoComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public datiCandidato!: Persone;
  public dettagliCandidato!: any;
  public commentiCandidato!: allCommentiCandidato[];
  public colore!: number;
  opacity = "1";
  public pagina!: number;
  public idRichiesta!: number;
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
      this.pagina = this.route.snapshot.params['pagina'];
      this.idRichiesta = this.route.snapshot.params['idRichiesta'];
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
    if (confirm("Sicuro di voler eliminare " + this.datiCandidato.nome + " " + this.datiCandidato.nome + "?") == true)
      this.candidatiService.eliminaCandidato(this.idCandidato).subscribe(
        (response: any) => {
          alert("Candidato eliminato con successo");
          if (this.pagina == 0)
            this.router.navigate(["default/pagina-candidati"]);
          else
            this.router.navigate(["default/pagina-scelta-candidati-richiesta"]);
        }
      )
  }

  public openLinkedin(): void {
    if (this.dettagliCandidato.profiloLinkedin != "")
      window.open(this.dettagliCandidato.profiloLinkedin, '_black')
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