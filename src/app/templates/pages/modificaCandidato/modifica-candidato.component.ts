import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';
import { RisorseService } from 'src/app/service/risorse.service';
import { ActivatedRoute } from '@angular/router';
import { Risorse } from 'src/app/model/risorse';
import { DettagliRisorse } from 'src/app/model/dettagli_risorse';
import { NgForm } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  templateUrl: './modifica-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class ModificaCandidatoComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idRisorsa  =sessionStorage.getItem("idRisorsa") as unknown as number;
  public idCandidato!: number;
  public datiCandidato!: Risorse;
  public dettagliCandidato!: any;
  public listaSelects!: DettagliRisorse;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private risorseService: RisorseService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Personale' || this.ruolo == 'Dipendente')
        this.router.navigate(["default/pagina-avvisi"]);
      else{
        this.titleService.setTitle("Gestech | Modifica Candidati");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Modifica Candidati";
        }, 0)
        this.idCandidato = this.route.snapshot.params['idCandidato'];
        this.getDatiModifica();
      }
  }

  public getDatiModifica(): void {
    this.risorseService.getCandidatoModifica(this.idCandidato).subscribe(
      (response: any[]) => {
        if (response != null) {
          this.datiCandidato = response[0];
          this.dettagliCandidato = response[1];
          this.listaSelects = response[2];
        }
        else
          this.router.navigate(["candidato-non-trovato"]);
      }
    )
  }

  public updateCandidato(updateForm: NgForm): void {
    this.risorseService.emailEsistente(updateForm.value.email).subscribe(
      (response: number) => {
        if (response == 0 && updateForm.value.email != this.datiCandidato.email)
          alert("Email già esistente");
        else {
          if (updateForm.value.esitoColloquio == "")
            updateForm.value.esitoColloquio = this.listaSelects.idEsitoColloquio.toString();

          if (updateForm.value.profilo == "")
            updateForm.value.profilo = this.listaSelects.idProfilo.toString();

          if (updateForm.value.skill1 == "")
            updateForm.value.skill1 = this.listaSelects.idSkill1.toString();
          if (updateForm.value.skill2 == "")
            updateForm.value.skill2 = this.listaSelects.idSkill2.toString();
          if (updateForm.value.skill3 == "")
            updateForm.value.skill3 = this.listaSelects.idSkill3.toString();
          if (updateForm.value.skill4 == "")
            updateForm.value.skill4 = this.listaSelects.idSkill4.toString();
          if (updateForm.value.skill5 == "")
            updateForm.value.skill5 = this.listaSelects.idSkill5.toString();

          if (updateForm.value.lingua1 == "")
            updateForm.value.lingua1 = this.listaSelects.idLingua1.toString();
          if (updateForm.value.lingua2 == "")
            updateForm.value.lingua2 = this.listaSelects.idLingua2.toString();
          if (updateForm.value.lingua3 == "")
            updateForm.value.lingua3 = this.listaSelects.idLingua3.toString();

          if (updateForm.value.livello == "")
            updateForm.value.livello = this.listaSelects.idSeniority.toString();

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

          this.risorseService.updateCandidato(updateForm.value, this.idCandidato, this.idRisorsa).subscribe(
            (response: any) => {
              alert("Candidato modificato con successo");
              this.router.navigate(["default/pagina-candidati"]);
            }
          )
        }
      }
    )
  }
}
