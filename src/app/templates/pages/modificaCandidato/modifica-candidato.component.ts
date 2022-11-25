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
import { CCNLService } from 'src/app/service/ccnl.service';
import { LivelliInquadramentoService } from 'src/app/service/livelli-inquadramento.service';

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
  public listaCcnl!: any[];
  public listaLivelloInquadramento!: any[];
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

  public response!: any;

  constructor(private router: Router, private esitiColloquioService: EsitiColloquioService, private profiliService: ProfiliService,
    private linguaggiService: LinguaggiService, private lingueService: LingueService, private livelliService: LivelliService,
    private ccnlService: CCNLService, private livelliInquandramentoService: LivelliInquadramentoService,
    private candidatiService: CandidatiService, private titleService: Title, private defaultService: DefaultComponent,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin' 
          || this.ruolo == 'Recruiter' 
          || this.ruolo == 'Direttore Recruiter'
          || this.ruolo == 'Direttore Commerciale'){
        this.titleService.setTitle("Gestech | Modifica Candidati");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Modifica Candidati";
        })
        this.idCandidato = sessionStorage.getItem("idCandidato") as unknown as number;
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
      (response: any) => {
        console.log(response)
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.response = response.dataSource;

          for (var c = 0; c < this.response.infoProfili.length; c++) {
            if (this.response.infoProfili[c].nomeProfilo == 'analista programmatore')
              this.arrayProfilo.push({ "programmatore": true });
            else
              this.arrayProfilo.push({ "programmatore": false });
            this.arrayValori.push({
              "profilo": this.response.infoProfili[c].idProfilo,
              "linguaggio": this.response.infoProfili[c].idLinguaggio,
              "livello": this.response.infoProfili[c].idLivello,
              "note": this.response.infoProfili[c].descrizione
            });
          }
          for (var c = 0; c < this.response.infoLingue.length; c++) {
            this.arrayLingue.push({
              "lingua": this.response.infoLingue[c].idLingua
            });
          }
          this.esitoColloquio = this.response.infoDettaglioCandidato.esitoColloquio;
        }
      }
    )
  }

  public getSelects(): void {
    this.esitiColloquioService.getEsitiColloquio().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaEsitiColloquio = response.dataSource;
        }
      }
    )
    this.profiliService.getProfili().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaProfili = response.dataSource;
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
          this.listaLinguaggi = response.dataSource;
        }
      }
    )
    this.lingueService.getLingue().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaLingue = response.dataSource;
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
          this.listaLivelli = response.dataSource;
        }
      }
    )
    this.ccnlService.getCcnl().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaCcnl = response.dataSource;
        }
      }
    )
  }

  public updateCandidato(updateForm: NgForm): void {
    this.candidatiService.emailEsistente(updateForm.value.email).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else if (response.dataSource == 0 && updateForm.value.email != this.response.infoPersona.email)
          alert("Email già esistente");
        else {
          if (updateForm.value.esitoColloquio == "")
            updateForm.value.esitoColloquio = this.response.infoDettaglioCandidato.idEsitoColloquio.toString();

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

          if (updateForm.value.livelloInquadramento == "")
            updateForm.value.livelloInquadramento = this.response.infoDettaglioCandidato.livelloInquadramentoId.toString();

          if (updateForm.value.ccnl == "")
            updateForm.value.ccnl = this.response.infoDettaglioCandidato.ccnlid.toString();
          
          updateForm.value.listaProfili = this.arrayValori;
          updateForm.value.listaLingue = this.arrayLingue;

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
    var idProfilo = e.target.value;
    var numeroRiga = e.path[2].id.toString().replace("row-ruolo-", '')
    if (this.arrayProfilo[numeroRiga] == null) {
      if (idProfilo == '2') {
        e.path[2].children.linguaggioDiv.style.removeProperty("display");
        e.path[2].children.livelloProgrammatoreDiv.style.removeProperty("display");
        this.arrayProfilo.push({"programmatore": true});
        this.arrayValori.push({"profilo": idProfilo, "linguaggio": 55, "livello": 6, "note": ""});
        
      }
      if (idProfilo != '2') {
        e.path[2].children.livelloDiv.style.removeProperty("display");
        this.arrayProfilo.push({"programmatore": false});
        this.arrayValori.push({"profilo": idProfilo, "linguaggio": 55, "livello": 6, "note": ""});
      }
      e.path[2].children.noteDiv.style.removeProperty("display");

      if (document.querySelectorAll("[id*='row-ruolo-']").length-1 == numeroRiga && numeroRiga != 0)
        e.path[2].children.buttons.style.removeProperty("display");
      else
        e.path[2].children.button.style.removeProperty("display");
    }
    else {
      if (idProfilo == '2' && this.arrayProfilo[numeroRiga].programmatore == false) {
        e.path[2].children.livelloDiv.style.display = 'none';
        e.path[2].children.linguaggioDiv.style.removeProperty("display");
        e.path[2].children.livelloProgrammatoreDiv.style.removeProperty("display");
        this.arrayProfilo[numeroRiga].programmatore = true;
        this.arrayValori[numeroRiga].profilo = idProfilo;
        this.arrayValori[numeroRiga].linguaggio = 55;
        this.arrayValori[numeroRiga].livello = 6;
        this.arrayValori[numeroRiga].note = "";
        e.path[2].children.livelloProgrammatoreDiv.children[1].selectedIndex = "";
        e.path[2].children.linguaggioDiv.children[1].selectedIndex = "";
        var note = e.path[2].children[4].children[1] as HTMLInputElement;
        note.value = "";
      }
      if (idProfilo != '2' && this.arrayProfilo[numeroRiga].programmatore == false) {
        e.path[2].children.livelloDiv.children[1].selectedIndex = "";
        this.arrayValori[numeroRiga].profilo = idProfilo;
        this.arrayValori[numeroRiga].linguaggio = 55;
        this.arrayValori[numeroRiga].livello = 6;
        this.arrayValori[numeroRiga].note = "";
        var note = e.path[2].children[4].children[1] as HTMLInputElement;
        note.value = "";
      }
      if (idProfilo != '2' && this.arrayProfilo[numeroRiga].programmatore == true) {
        e.path[2].children.linguaggioDiv.style.display = 'none';
        e.path[2].children.livelloProgrammatoreDiv.style.display = 'none';
        e.path[2].children.livelloDiv.style.removeProperty("display");
        this.arrayProfilo[numeroRiga].programmatore = false;
        this.arrayValori[numeroRiga].profilo = idProfilo;
        this.arrayValori[numeroRiga].linguaggio = 55;
        this.arrayValori[numeroRiga].livello = 6;
        this.arrayValori[numeroRiga].note = "";
        e.path[2].children.livelloDiv.children[1].selectedIndex = "";
        var note = e.path[2].children[4].children[1] as HTMLInputElement;
        note.value = "";
      }
    }
  }

  selectLingua(e: any) {
    var idLingua = e.target.value;
    var numeroRiga = e.path[2].id.toString().replace("row-lingua-", '')
    if (this.arrayLingue[numeroRiga] == null) {
      this.arrayLingue.push({"lingua": idLingua});
    }
    else
      this.arrayLingue[numeroRiga].lingua = idLingua;
    if (numeroRiga == 0) {
      e.path[2].children.button.style.removeProperty("display");
    }
    else {
      e.path[2].children.buttons.style.removeProperty("display");
    }
  }

  selectLivelloInquadramento(e: any){
    this.livelliInquandramentoService.getLivelliInquadramento(e.target.value).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaLivelloInquadramento = response.dataSource;
          if(e.target.value != 4){
            (<HTMLSelectElement>document.getElementById("livelloInquadramento")).disabled = false;
            (<HTMLOptionElement>document.getElementById("livelloInquadramentoOption")).remove();
          }
          else{
            (<HTMLSelectElement>document.getElementById("livelloInquadramento")).disabled = true;
          }
        }
      }
    )
  }

  addRowLingua() {
    var rigaBase = <NodeList>document.querySelectorAll("#lista-lingue div[id^='row-lingua']");
    var numeroRiga = rigaBase.length;
    var riga = document.getElementById("row-lingua-" + (numeroRiga-1)) as HTMLDivElement;
    var contenitore = document.getElementById('lista-lingue');
    var pulsanteAdd = riga.children[1].children[0].children[0].children[1] as HTMLButtonElement;
    var pulsanteAdd2 = riga.children[2].children[0].children[1].children[1] as HTMLButtonElement;
    riga.children[2].setAttribute('style', 'display: none');
    riga.children[1].removeAttribute('style');
    var rigaClone = riga!.cloneNode(true) as HTMLDivElement
    contenitore!.appendChild(rigaClone);
    pulsanteAdd.disabled = true;
    pulsanteAdd2.disabled = true;

    var linguaSelect = rigaClone.children[0].children[1] as HTMLInputElement;
    linguaSelect.value = "";

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
    rigaNuova.children[2].setAttribute('style', 'display: none');
  }

  removeRowLingua() {
    var rigaBase = <NodeList>document.querySelectorAll("#lista-lingue div[id^='row-lingua']");
    var numeroRiga = rigaBase.length;
    var riga = document.getElementById("row-lingua-" + (numeroRiga-1)) as HTMLDivElement;
    riga.remove();
    var riga = document.getElementById("row-lingua-" + (numeroRiga-2)) as HTMLDivElement;
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
    this.arrayValori[numeroRiga].linguaggio = idLinguaggio as unknown as number;
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
    var rigaBase = <NodeList>document.querySelectorAll("#lista-ruoli div[id^='row-ruolo']");
    var numeroRiga = rigaBase.length;
    var riga = document.getElementById("row-ruolo-" + (numeroRiga-1)) as HTMLDivElement;
    var pulsanteAdd = riga.children[5].children[0].children[0].children[1] as HTMLButtonElement;
    var pulsanteAdd2 = riga.children[6].children[0].children[1].children[1] as HTMLButtonElement;
    var rigaNuova = riga.cloneNode(true) as HTMLDivElement
    riga.children[6].setAttribute('style', 'display: none');
    riga.children[5].removeAttribute('style');
    pulsanteAdd.disabled = true;
    pulsanteAdd2.disabled = true;
    rigaNuova.id = "row-ruolo-" + numeroRiga;
    var contenitore = document.getElementById('lista-ruoli');
    contenitore!.appendChild(rigaNuova);

    let nodes = <NodeList>document.querySelectorAll("#row-ruolo-" + numeroRiga + " select, #row-ruolo-" + numeroRiga + " input");
    for ( let i = 0; i < nodes.length; i++){
      let node = nodes[i];
      var c = (node as HTMLInputElement);
      c.value = "";
    }
    if (this.arrayValori[numeroRiga-1].profilo == '2')
      programmatore = true;
    else
      programmatore = false;

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
      rigaNuova.children[6].setAttribute('style', 'display: none');
    }
    else {
      var idProfilo = rigaNuova.children[0].children[1] as HTMLInputElement;
      idProfilo.value = '2';
      rigaNuova.children[5].setAttribute('style', 'display: none');
      rigaNuova.children[6].removeAttribute('style');
      this.arrayProfilo.push({"programmatore": true});
      this.arrayValori.push({"profilo": 2});
    }
  }

  removeRowProfilo() {
    var listaRuoli = <NodeList>document.querySelectorAll("#lista-ruoli div[id^='row-ruolo']");
    var numeroRiga = listaRuoli.length;
    var riga = document.getElementById("row-ruolo-" + (numeroRiga-1)) as HTMLDivElement;
    riga.remove();
    var riga = document.getElementById("row-ruolo-" + (numeroRiga-2)) as HTMLDivElement;
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
