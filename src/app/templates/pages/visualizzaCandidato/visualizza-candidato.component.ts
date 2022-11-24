import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { CandidatiService } from 'src/app/service/candidati.service';
import { DOCUMENT } from '@angular/common';
import { allCommentiCandidato } from 'src/app/model/mapper/allCommentiCandidato';
import { Persone } from 'src/app/model/persone';
import { getProfili } from 'src/app/model/mapper/getProfili';

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
  public profili!: getProfili[];
  public lingue!: string[];
  public pagina!: number;
  public idRichiesta!: number;
  public esitoColloquio!: string;
  public fileBase64!: string;
  public idCandidato!: number;
  public titoloPagina: any;

  public response!: any;

  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private defaultService: DefaultComponent,
              private candidatiService: CandidatiService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
    if (this.ruolo == 'Admin' || this.ruolo == 'Recruiter' || this.ruolo == 'Direttore Recruiter' 
    || this.ruolo == 'Direttore Commerciale'){
      this.titleService.setTitle("Gestech | Visualizza Candidato");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Visualizza Candidato";
      }, 0)
      this.idCandidato = sessionStorage.getItem("idCandidato") as unknown as number;
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
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.response = response.dataSource;
        }
      }
    )
  }

  public eliminaCandidato(): void{
    if (confirm("Sicuro di voler eliminare " + this.response.infoPersona.nome + " " + this.response.infoPersona.nome + "?") == true)
      this.candidatiService.eliminaCandidato(this.idCandidato).subscribe(
        (response: any) => {
          if (response.codeSession == "0") {
            sessionStorage.setItem("sessionMessage", "Sessione scaduta");
            this.defaultService.logout();
          }
          else {
            alert("Candidato eliminato con successo");
            if (this.pagina == 0)
              this.router.navigate(["default/pagina-candidati"]);
            else
              this.router.navigate(["default/pagina-scelta-candidati-richiesta"]);
          }
        }
      )
  }

  public openLinkedin(): void {
    if (this.response.infoDettaglioCandidato.profiloLinkedin != "")
      window.open(this.response.infoDettaglioCandidato.profiloLinkedin, '_black')
    else
      alert("Nessun link a linkedin trovato");
  }

  public copy(): void {
    navigator.clipboard.writeText(window.location.href);
  }

  public scaricaCV() {
    if (this.response.cvBase64 != "")
      window.open(this.response.cvBase64, '_black')
  }
}