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
import { Linguaggi } from 'src/app/model/linguaggi';
import { Profili } from 'src/app/model/profili';
import { EsitiColloquio } from 'src/app/model/esiti_colloquio';
import { Lingue } from 'src/app/model/lingue';
import { Livelli } from 'src/app/model/livelli';
import { LinguaggiService } from 'src/app/service/linguaggi.service';
import { EsitiColloquioService } from 'src/app/service/esiti-colloquio.service';
import { LingueService } from 'src/app/service/lingua.service';
import { ProfiliService } from 'src/app/service/profili.service';
import { LivelliService } from 'src/app/service/livelli.service';

@Component({
  templateUrl: './modifica-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class ModificaCandidatoComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public listaEsitiColloquio!: EsitiColloquio[];
  public listaProfili!: Profili[];
  public listaLinguaggi!: Linguaggi[];
  public listaLingue!: Lingue[];
  public listaLivelli!: Livelli[];
  public idCandidato!: number;
  public datiCandidato!: Candidati;
  public dettagliCandidato!: DettagliCandidati;
  public esitoColloquio!: string;
  public pagina!: number;
  public arrayProfilo = new Array();
  public arrayValori = new Array();
  public arrayLingue = new Array();
  public idRichiesta!: number;
  public listaSelects!: any;

  constructor(private router: Router, private esitiColloquioService: EsitiColloquioService, private profiliService: ProfiliService,
    private linguaggiService: LinguaggiService, private lingueService: LingueService, private livelliService: LivelliService,
    private candidatiService: CandidatiService, private titleService: Title, private defaultService: DefaultComponent,
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
        this.getSelects();
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
          this.dettagliCandidato = response[1];
          this.arrayValori = response[2];
          this.arrayValori.forEach(profilo => {
            if (profilo.nomeProfilo == 'analista programmatore')
              this.arrayProfilo.push({"programmatore": true});
            else
              this.arrayProfilo.push({"programmatore": false});
          });
          this.esitoColloquio = response[4];
        }
        else
          this.router.navigate(["candidato-non-trovato"]);
      }
    )
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

  selectProfilo(e: any) {
    console.log(e.path[2])
    var idProfilo = e.target.value;
    var numeroRiga = e.path[2].id.toString().replace("row-ruolo-", '')
    if (this.arrayProfilo[numeroRiga] == null) {
      if (idProfilo == '2') {
        e.path[2].children.linguaggio.style.removeProperty("display");
        e.path[2].children.livelloProgrammatore.style.removeProperty("display");
        this.arrayProfilo.push({"programmatore": true});
        this.arrayValori.push({"profilo": idProfilo, "linguaggio": 55, "livello": 6, "note": ""});
        
      }
      if (idProfilo != '2') {
        e.path[2].children.livello.style.removeProperty("display");
        this.arrayProfilo.push({"programmatore": false});
        this.arrayValori.push({"profilo": idProfilo, "linguaggio": 55, "livello": 6, "note": ""});
      }
      e.path[2].children.note.style.removeProperty("display");

      if (document.querySelectorAll("[id*='row-ruolo-']").length-1 == numeroRiga && numeroRiga != 0)
        e.path[2].children.buttons.style.removeProperty("display");
      else
        e.path[2].children.button.style.removeProperty("display");
    }
    else {
      if (idProfilo == '2' && this.arrayProfilo[numeroRiga].programmatore == false) {
        e.path[2].children.livello.style.display = 'none';
        e.path[2].children.linguaggio.style.removeProperty("display");
        e.path[2].children.livelloProgrammatore.style.removeProperty("display");
        this.arrayProfilo[numeroRiga].programmatore = true;
        this.arrayValori[numeroRiga].profilo = idProfilo;
        this.arrayValori[numeroRiga].linguaggio = 55;
        this.arrayValori[numeroRiga].livello = 6;
        this.arrayValori[numeroRiga].note = "";
        e.path[2].children.livelloProgrammatore.children[1].selectedIndex = "";
        e.path[2].children.linguaggio.children[1].selectedIndex = "";
        var note = e.path[2].children[4].children[1] as HTMLInputElement;
        note.value = "";
      }
      if (idProfilo != '2' && this.arrayProfilo[numeroRiga].programmatore == false) {
        e.path[2].children.livello.children[1].selectedIndex = "";
        this.arrayValori[numeroRiga].profilo = idProfilo;
        this.arrayValori[numeroRiga].linguaggio = 55;
        this.arrayValori[numeroRiga].livello = 6;
        this.arrayValori[numeroRiga].note = "";
        var note = e.path[2].children[4].children[1] as HTMLInputElement;
        note.value = "";
      }
      if (idProfilo != '2' && this.arrayProfilo[numeroRiga].programmatore == true) {
        e.path[2].children.linguaggio.style.display = 'none';
        e.path[2].children.livelloProgrammatore.style.display = 'none';
        e.path[2].children.livello.style.removeProperty("display");
        this.arrayProfilo[numeroRiga].programmatore = false;
        this.arrayValori[numeroRiga].profilo = idProfilo;
        this.arrayValori[numeroRiga].linguaggio = 55;
        this.arrayValori[numeroRiga].livello = 6;
        this.arrayValori[numeroRiga].note = "";
        e.path[2].children.livello.children[1].selectedIndex = "";
        var note = e.path[2].children[4].children[1] as HTMLInputElement;
        note.value = "";
      }
    }
  }

  selectLingua(e: any) {
    var idLingua = e.target.value;
    var numeroRiga = e.path[2].id.toString().replace("row-lingua-", '')
    if (numeroRiga == 0) {
      e.path[2].children.button.style.removeProperty("display");
    }
    else {
      e.path[2].children.buttons.style.removeProperty("display");
    }
    this.arrayLingue.push({"lingua": idLingua});
  }

  addRowLingua() {
    var rigaBase = document.getElementById('lista-lingue')!.lastChild as HTMLDivElement;
    var contenitore = document.getElementById('lista-lingue');
    var pulsanteAdd = rigaBase.children[1].children[0].children[0].children[1] as HTMLButtonElement;
    var pulsanteAdd2 = rigaBase.children[2].children[0].children[1].children[1] as HTMLButtonElement;
    rigaBase.children[2].setAttribute('style', 'display: none');
    rigaBase.children[1].removeAttribute('style');
    contenitore!.appendChild(rigaBase!.cloneNode(true));
    pulsanteAdd.disabled = true;
    pulsanteAdd2.disabled = true;

    var rigaNuova = document.getElementById('lista-lingue')!.lastChild as HTMLDivElement;
    var numeroRigaNuova = parseInt(rigaNuova!.id.toString().replace("row-lingua-", '')) + 1;
    rigaNuova!.id = "row-lingua-" + numeroRigaNuova;

    var lingua = rigaNuova.children[0].children[1] as HTMLElement;
    lingua.addEventListener('change', (changeEvent: Event) => {
      this.selectLingua(changeEvent);
    });
    var remove = rigaNuova.children[2].children[0].children[0].children[1] as HTMLElement;
    remove.addEventListener('click', (clickEvent: MouseEvent) => {
      this.removeRowLingua();
    });
    var add1 = rigaNuova.children[1].children[0].children[0].children[1] as HTMLElement;
    add1.addEventListener('click', (clickEvent: MouseEvent) => {
      this.addRowLingua();
    });
    var add2 = rigaNuova.children[2].children[0].children[1].children[1] as HTMLElement;
    add2.addEventListener('click', (clickEvent: MouseEvent) => {
      this.addRowLingua();
    });
    rigaNuova.children[1].setAttribute('style', 'display: none');
    rigaNuova.children[2].removeAttribute('style');
  }

  removeRowLingua() {
    var riga = document.getElementById('lista-lingue')!.lastChild as HTMLDivElement;
    riga.remove();
    var riga = document.getElementById('lista-lingue')!.lastChild as HTMLDivElement;
    var button1 = riga.children[1].children[0].children[0].children[1] as HTMLButtonElement;
    button1.disabled = false;
    var button2 = riga.children[2].children[0].children[1].children[1] as HTMLButtonElement;
    button2.disabled = false;
    this.arrayLingue.pop();
    if (parseInt(riga!.id.toString().replace("row-lingua-", '')) != 0) {
      riga.children[2].removeAttribute('style');
      riga.children[1].setAttribute('style', 'display: none');
    }
  }

  selectLinguaggio(e: any) {
    var idLinguaggio = e.target.value;
    var numeroRiga = e.path[2].id.toString().replace("row-ruolo-", '')
    this.arrayValori[numeroRiga].linguaggio = idLinguaggio;
  }

  selectLivello(e: any) {
    var idLivello = e.target.value;
    var numeroRiga = e.path[2].id.toString().replace("row-ruolo-", '')
    this.arrayValori[numeroRiga].livello = idLivello;
  }

  selectNote(e: any) {
    var note = e.target.value;
    var numeroRiga = e.path[2].id.toString().replace("row-ruolo-", '')
    this.arrayValori[numeroRiga].note = note;
  }

  addRowProfilo() {
    var programmatore : boolean;
    var rigaBase = document.getElementById('lista-ruoli')!.lastChild as HTMLDivElement;
    var numeroRigaBase = parseInt(rigaBase!.id.toString().replace("row-ruolo-", ''));
    var contenitore = document.getElementById('lista-ruoli');
    var pulsanteAdd = rigaBase.children[5].children[0].children[0].children[1] as HTMLButtonElement;
    var pulsanteAdd2 = rigaBase.children[6].children[0].children[1].children[1] as HTMLButtonElement;
    rigaBase.children[6].setAttribute('style', 'display: none');
    rigaBase.children[5].removeAttribute('style');
    contenitore!.appendChild(rigaBase!.cloneNode(true));
    pulsanteAdd.disabled = true;
    pulsanteAdd2.disabled = true;

    if (this.arrayValori[numeroRigaBase].profilo == '2')
      programmatore = true;
    else
      programmatore = false;

    var rigaNuova = document.getElementById('lista-ruoli')!.lastChild as HTMLDivElement;
    var numeroRigaNuova = parseInt(rigaNuova!.id.toString().replace("row-ruolo-", '')) + 1;
    rigaNuova!.id = "row-ruolo-" + numeroRigaNuova;
    var profilo = rigaNuova.children[0].children[1] as HTMLElement;
    profilo.addEventListener('change', (changeEvent: Event) => {
      this.selectProfilo(changeEvent);
    });
    var linguaggio = rigaNuova.children[1].children[1] as HTMLElement;
    linguaggio.addEventListener('change', (changeEvent: Event) => {
      this.selectLinguaggio(changeEvent);
    });
    var livello1 = rigaNuova.children[2].children[1] as HTMLElement;
    livello1.addEventListener('change', (changeEvent: Event) => {
      this.selectLivello(changeEvent);
    });
    var livello2 = rigaNuova.children[3].children[1] as HTMLElement;
    livello2.addEventListener('change', (changeEvent: Event) => {
      this.selectLivello(changeEvent);
    });
    var note = rigaNuova.children[4].children[1] as HTMLElement;
    note.addEventListener('change', (changeEvent: Event) => {
      this.selectNote(changeEvent);
    });
    var remove = rigaNuova.children[6].children[0].children[0].children[1] as HTMLElement;
    remove.addEventListener('click', (clickEvent: MouseEvent) => {
      this.removeRowProfilo();
    });
    var add1 = rigaNuova.children[5].children[0].children[0].children[1] as HTMLElement;
    add1.addEventListener('click', (clickEvent: MouseEvent) => {
      this.addRowProfilo();
    });
    var add2 = rigaNuova.children[6].children[0].children[1].children[1] as HTMLElement;
    add2.addEventListener('click', (clickEvent: MouseEvent) => {
      this.addRowProfilo();
    });

    if (programmatore == false) {
      rigaNuova.children[1].setAttribute('style', 'display: none');
      rigaNuova.children[2].setAttribute('style', 'display: none');
      rigaNuova.children[3].setAttribute('style', 'display: none');
      rigaNuova.children[4].setAttribute('style', 'display: none');
      rigaNuova.children[5].setAttribute('style', 'display: none');
    }
    else {
      var idProfilo = rigaNuova.children[0].children[1] as HTMLInputElement
      idProfilo.value = '2';
      rigaNuova.children[5].setAttribute('style', 'display: none');
      rigaNuova.children[6].removeAttribute('style');
      this.arrayProfilo.push({"programmatore": true});
      this.arrayValori.push({"profilo": '2'});
    }
    var resetNote = rigaNuova.children[4].children[1] as HTMLInputElement;
    resetNote.value = "";
  }

  removeRowProfilo() {
    var riga = document.getElementById('lista-ruoli')!.lastChild as HTMLDivElement;
    riga.remove();
    var riga = document.getElementById('lista-ruoli')!.lastChild as HTMLDivElement;
    var button1 = riga.children[5].children[0].children[0].children[1] as HTMLButtonElement;
    button1.disabled = false;
    var button2 = riga.children[6].children[0].children[1].children[1] as HTMLButtonElement;
    button2.disabled = false;
    this.arrayProfilo.pop();
    this.arrayValori.pop();
    if (parseInt(riga!.id.toString().replace("row-ruolo-", '')) != 0) {
      riga.children[6].removeAttribute('style');
      riga.children[5].setAttribute('style', 'display: none');
    }
  }
}
