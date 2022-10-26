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
import { Observable, Subscriber } from 'rxjs';

@Component({
  templateUrl: './nuovo-candidato.component.html',
  styleUrls: ['../../../../assets/css/main.home.css', "../../../../assets/css/main.candidati.css"]
  
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
  public arrayProfilo = new Array();
  public arrayValori = new Array();
  public arrayLingue = new Array();
  public base64!: string | ArrayBuffer | null;

  constructor(private router: Router, private esitiColloquioService: EsitiColloquioService, private profiliService: ProfiliService,
              private linguaggiService: LinguaggiService, private lingueService: LingueService, private livelliService: LivelliService,
              private candidatiService: CandidatiService, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' 
          || this.ruolo == 'Direttore Commerciale'
          || this.ruolo == 'Direttore Recruiter' 
          || this.ruolo == 'Recruiter'){
        this.titleService.setTitle("Gestech | Nuovo Candidati");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuovo Candidati";
        }, 0)
        this.getSelects();
        this.arrayProfilo = new Array();
        this.arrayValori = new Array();
        this.arrayLingue = new Array();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
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

    if (this.arrayValori != null)
      addForm.value.profilo = this.arrayValori;
    
    if (this.arrayLingue != null)
      addForm.value.lingue = this.arrayLingue;

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
    const file = event.target.files[0];
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((base64) => {
      this.base64 = base64
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      subscriber.next(reader.result);
      subscriber.complete();
    }
  }

  selectProfilo(e: any) {
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