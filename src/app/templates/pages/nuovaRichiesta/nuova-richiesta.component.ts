import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Linguaggi } from 'src/app/model/linguaggi';
import { Livelli } from 'src/app/model/livelli';
import { Profili } from 'src/app/model/profili';
import { LinguaggiService } from 'src/app/service/linguaggi.service';
import { LivelliService } from 'src/app/service/livelli.service';
import { ProfiliService } from 'src/app/service/profili.service';
import { RichiesteService } from 'src/app/service/richieste.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './nuova-richiesta.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
  
})
export class NuovaRichiestaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idRisorsa = sessionStorage.getItem("idRisorsa") as unknown as number;
  public listaProfili!: Profili[];
  public listaLinguaggi!: Linguaggi[];
  public listaLivelli!: Livelli[];
  public listaRecruiters!: string[];
  public titoloPagina: any;
  public checkArray: any[] = new Array();

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private richiesteService: RichiesteService,
              private profiliService: ProfiliService, private linguaggiService: LinguaggiService, private livelliService: LivelliService) {}

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else
      if (this.ruolo !== 'Admin' && this.ruolo !== 'Commerciale')
        this.router.navigate(['default/pagina-avvisi'])
      else {
        this.titleService.setTitle("Gestech | Nuova Richiesta");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuova Richiesta";
        }, 0)
        this.getSelects();
        this.getRecruiters();
      }
  }

  public getSelects(): void {
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
    this.livelliService.getLivelli().subscribe(
      (response: Livelli[]) => {
        this.listaLivelli = response;
      }
    )
  }

  public getRecruiters(): void {
    this.richiesteService.getRecruiters().subscribe(
      (response: string[]) => {
        this.listaRecruiters = response;
      }
    )
  }

  public array(e: any): void {
    if (e.target.checked)
      this.checkArray.push(e.target.value.toString());
    else {
      this.checkArray.forEach((value,index) => {
        if(value==e.target.value.toString()) this.checkArray.splice(index,1);
      });
    }
  }

  public aggiungiRichiesta(addForm: NgForm): void {
    if (this.checkArray.length == 0)
      alert("Inserire tutti o almeno un recruiter");
    else {
      addForm.value.listaRecruiters = this.checkArray;

      if (addForm.value.profilo == "")
        addForm.value.profilo = "17";

      if (addForm.value.linguaggio == "")
        addForm.value.linguaggio = "55";

      if (addForm.value.livello == "")
        addForm.value.livello = "6";

      if (addForm.value.costo == "") {
        addForm.value.costo = 0;
        addForm.value.costo = Number.parseFloat(addForm.value.costo).toFixed(2).toString();
      }
      else
        addForm.value.costo = addForm.value.costo.toString();

      addForm.value.idRisorsa = this.idRisorsa;
      this.richiesteService.addRichiesta(addForm.value).subscribe(
        (response: any) => {
          alert("Richiesta salvata con successo");
          this.router.navigate(['default/pagina-richieste'])
        }
      )
    }
  }
}
