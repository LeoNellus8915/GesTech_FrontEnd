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
import { ClientiService } from 'src/app/service/clienti.service';
import { DefaultComponent } from '../../default/default.component';
import { Clienti } from 'src/app/model/clienti';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './nuova-richiesta.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
  
})
export class NuovaRichiestaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public listaProfili!: Profili[];
  public listaLinguaggi!: Linguaggi[];
  public listaLivelli!: Livelli[];
  public listaClienti!: Clienti[];
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private richiesteService: RichiesteService,
              private profiliService: ProfiliService, private linguaggiService: LinguaggiService, private livelliService: LivelliService,
              private clientiService: ClientiService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Account'){
        this.titleService.setTitle("Gestech | Nuova Richiesta");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuova Richiesta";
        }, 0)
        this.getSelects();
      }
      else {
        this.router.navigate(['default/pagina-avvisi']);
      }
  }

  public getSelects(): void {
    this.profiliService.getProfili().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaProfili = response.dataSource
        }
      }
    )
    this.linguaggiService.getLinguaggi().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaLinguaggi = response.dataSource
        }
      }
    )
    this.livelliService.getLivelli().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaLivelli = response.dataSource
        }
      }
    )
    this.clientiService.getClienti().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaClienti = response.dataSource
        }
      }
    )
  }

  public aggiungiRichiesta(addForm: NgForm): void {
    if (addForm.value.linguaggio == "" || addForm.value.linguaggio == null)
      addForm.value.linguaggio = "56";

    if (addForm.value.profilo == "")
      addForm.value.profilo = "17";

    if (addForm.value.profilo != "2" || addForm.value.profilo != "19")
      addForm.value.linguaggio = "56";

    if (addForm.value.livello == "")
      addForm.value.livello = "6";

    if (addForm.value.costo == "") {
      addForm.value.costo = 0;
      addForm.value.costo = Number.parseFloat(addForm.value.costo).toFixed(2).toString();
    }
    else
      addForm.value.costo = addForm.value.costo.toString();

    addForm.value.idDipendente = this.idDipendente;
    this.richiesteService.addRichiesta(addForm.value, this.ruolo).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          alert("Richiesta salvata con successo");
          this.router.navigate(['default/pagina-richieste'])
        }
      }
    )
  }

  // public programmatore(e: any) {
  //   var x = e.path[2].children[1].children[1] as HTMLSelectElement;
  //   if (e.target.value == '2') {
  //     x.disabled = false;
  //   }
  //   else {
  //     x.disabled = true;
  //     e.path[2].children[1].children[1].selectedIndex = "";
  //   }
  // }
}
