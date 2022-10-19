import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';
import { CandidatiService } from 'src/app/service/candidati.service';
import { ActivatedRoute } from '@angular/router';
import { Candidati } from 'src/app/model/candidati';
import { DettagliCandidati } from 'src/app/model/dettagli_candidati';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  templateUrl: './modifica-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class ModificaCandidatoComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public idCandidato!: number;
  public datiCandidato!: Candidati;
  public dettagliCandidato!: DettagliCandidati;
  public pagina!: number;
  public idRichiesta!: number;
  public listaSelects!: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private candidatiService: CandidatiService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' 
          || this.ruolo == 'Recruiter' 
          || this.ruolo == 'Direttore Recruiter'
          || this.ruolo == 'Direttore Commerciale'){
        this.titleService.setTitle("Gestech | Modifica Candidati");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Modifica Candidati";
        }, 0)
        this.idCandidato = this.route.snapshot.params['idCandidato'];
        this.pagina = this.route.snapshot.params['pagina'];
        this.idRichiesta = this.route.snapshot.params['idRichiesta'];
        this.getDatiModifica();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public getDatiModifica(): void {
    this.candidatiService.getCandidatoModifica(this.idCandidato).subscribe(
      (response: any[]) => {
        if (response != null) {
          console.log(response)
          this.datiCandidato = response[0];
          this.listaSelects = response[1];
          this.dettagliCandidato = response[2];
        }
        else
          this.router.navigate(["candidato-non-trovato"]);
      }
    )
  }

  public updateCandidato(updateForm: NgForm): void {
    this.candidatiService.emailEsistente(updateForm.value.email).subscribe(
      (response: number) => {
        if (response == 0 && updateForm.value.email != this.datiCandidato.email)
          alert("Email già esistente");
        else {
          if (updateForm.value.esitoColloquio == "")
            updateForm.value.esitoColloquio = this.dettagliCandidato.idEsitoColloquio.toString();

          if (updateForm.value.costoGiornaliero == "") {
            updateForm.value.costoGiornaliero = 0;
            updateForm.value.costoGiornaliero = Number.parseFloat(updateForm.value.costoGiornaliero).toFixed(2).toString();
          }
          else
            updateForm.value.costoGiornaliero = updateForm.value.costoGiornaliero.toString();

          if (updateForm.value.dataColloquio == "")
            updateForm.value.dataColloquio = formatDate(new Date(), 'yyyy-MM-dd', 'en');

          if (updateForm.value.annoColloquio == "")
          updateForm.value.annoColloquio = new Date().getFullYear;

          this.candidatiService.updateCandidato(updateForm.value, this.idCandidato, this.idDipendente).subscribe(
            (response: any) => {
              alert("Candidato modificato con successo");
              if (this.pagina == 0)
                this.router.navigate(["default/pagina-candidati"]);
              else
                this.router.navigate(["default/pagina-scelta-candidati-richiesta"]);
            }
          )
        }
      }
    )
  }
}
