import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EsitiColloquio } from 'src/app/model/esiti_colloquio';
import { Linguaggi } from 'src/app/model/linguaggi';
import { Lingue } from 'src/app/model/lingue';
import { Livelli } from 'src/app/model/livelli';
import { Profili } from 'src/app/model/profili';
import { EsitiColloquioService } from 'src/app/service/esiti-colloquio.service';
import { ProfiliService } from 'src/app/service/profili.service';
import { LinguaggiService } from 'src/app/service/linguaggi.service';
import { LingueService } from 'src/app/service/lingua.service';
import { LivelliService } from 'src/app/service/livelli.service';
import { formatDate } from '@angular/common';
import { CandidatiService } from 'src/app/service/candidati.service';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './nuovo-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class NuovoCandidatoComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public listaEsitiColloquio!: EsitiColloquio[];
  public listaProfili!: Profili[];
  public listaLinguaggi!: Linguaggi[];
  public listaLingue!: Lingue[];
  public listaLivelli!: Livelli[];
  public titoloPagina: any;
  public fileSelected?: Blob;
  public base64!: string | ArrayBuffer | null;

  constructor(private router: Router, private esitiColloquioService: EsitiColloquioService, private profiliService: ProfiliService,
              private linguaggiService: LinguaggiService, private lingueService: LingueService, private livelliService: LivelliService,
              private candidatiService: CandidatiService, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Personale' || this.ruolo == 'Dipendente')
        this.router.navigate(["default/pagina-avvisi"]);
      else{
        this.titleService.setTitle("Gestech | Nuovo Candidati");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuovo Candidati";
        }, 0)
        this.getSelects();
      }
  }

  public getSelects(): void {
    this.esitiColloquioService.getEsitiColloquio().subscribe(
      (response: EsitiColloquio[]) => {
        this.listaEsitiColloquio = response;
      }
    )
    this.profiliService.getProfili().subscribe(
      (response: Profili[]) => {
        this.listaProfili = response;
      }
    )
    this.linguaggiService.getLinguaggi().subscribe(
      (response: Linguaggi[]) => {
        this.listaLinguaggi = response;
      }
    )
    this.lingueService.getLingue().subscribe(
      (response: Lingue[]) => {
        this.listaLingue = response;
      }
    )
    this.livelliService.getLivelli().subscribe(
      (response: Livelli[]) => {
        this.listaLivelli = response;
      }
    )
  }

  public aggiungiCandidato(addForm: NgForm): void {
    if (addForm.value.esitoColloquio == "")
      addForm.value.esitoColloquio = "11";

    if (addForm.value.profilo == "")
      addForm.value.profilo = "17";

    if (addForm.value.linguaggio1 == "")
      addForm.value.linguaggio1 = "55";
    if (addForm.value.linguaggio2 == "")
      addForm.value.linguaggio2 = "55";
    if (addForm.value.linguaggio3 == "")
      addForm.value.linguaggio3 = "55";
    if (addForm.value.linguaggio4 == "")
      addForm.value.linguaggio4 = "55";
    if (addForm.value.linguaggio5 == "")
      addForm.value.linguaggio5 = "55";

    if (addForm.value.lingua1 == "")
      addForm.value.lingua1 = "25";
    if (addForm.value.lingua2 == "")
      addForm.value.lingua2 = "25";
    if (addForm.value.lingua3 == "")
      addForm.value.lingua3 = "25";

    if (addForm.value.livello == "")
      addForm.value.livello = "6";

    if (addForm.value.costoGiornaliero == "") {
      addForm.value.costoGiornaliero = 0;
      addForm.value.costoGiornaliero = Number.parseFloat(addForm.value.costoGiornaliero).toFixed(2).toString();
    }
    else
      addForm.value.costoGiornaliero = addForm.value.costoGiornaliero.toString();

    if (addForm.value.dataColloquio == "")
      addForm.value.dataColloquio = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    if (addForm.value.annoColloquio == "")
      addForm.value.annoColloquio = new Date().getFullYear();

    addForm.value.idDipendente = this.idDipendente;

    addForm.value.cv = this.base64;

    console.log(addForm.value)
    
    this.candidatiService.salvaCandidato(addForm.value).subscribe(
      (response: any) => {
        if (response == 0)
          alert("Email già esistente");
        else {
          alert("Candidato salvato con successo");
          this.router.navigate(["default/pagina-candidati"]);
        }
      }
    )
  }

  selectFile(event: any) {
    let reader = new FileReader();
    var appoggio: string | ArrayBuffer | null;
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      appoggio = reader.result
    }
    setTimeout(() => {
      this.base64 = appoggio;
    }, 50)
    
  }
}