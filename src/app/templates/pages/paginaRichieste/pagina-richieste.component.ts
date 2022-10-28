import { Component, OnInit } from '@angular/core';
import { RichiesteService } from 'src/app/service/richieste.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { DipendentiRichiesteService } from 'src/app/service/dipendenti-richieste.service';
import { allRichieste } from 'src/app/model/mapper/allRichieste';
import { allRichiesteAperte } from 'src/app/model/mapper/allRichiesteAperte';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './pagina-richieste.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css', '../../../../assets/css/main.candidati.css']
})

export class PaginaRichiesteComponent implements OnInit {
  public listaRichieste!: allRichiesteAperte[];
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public nome = sessionStorage.getItem("nome") as string;
  public cognome = sessionStorage.getItem("cognome") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public contatore!: number;

  constructor(private dipendentiRichiesteService: DipendentiRichiesteService, private defaultService: DefaultComponent, 
    private titleService: Title, private router: Router, private richiesteService: RichiesteService) { }

  public radioArray: any[] = new Array();

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else if (this.ruolo == 'Admin' 
              || this.ruolo === 'Account' 
              || this.ruolo === 'Recruiter' 
              || this.ruolo === 'Direttore Recruiter'
              || this.ruolo === 'Direttore Commerciale'){
      this.titleService.setTitle("Gestech | Richieste");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Richieste";
      }, 0)
      if (this.ruolo == 'Admin')
        this.getRichiesteAdmin();
      if (this.ruolo == 'Account')
        this.getRichiesteAccount();
      if (this.ruolo == 'Direttore Commerciale')
        this.getRichiesteCommerciale();
      if (this.ruolo == 'Direttore Recruiter')
        this.getRichiesteRecruiter();
      if (this.ruolo == 'Recruiter')
        this.getRichieste();
        this.contatore = 0;
    }
    else {
      this.router.navigate(['default/pagina-avvisi']);
    }
  }

  public getRichiesteAdmin(): void {
    this.richiesteService.getRichiesteAperteAdmin().subscribe(
      (response: any[]) => {
        if (response == null) this.router.navigate(['']);
        else{
          response[1].forEach((richiesta: { priorita: number; }) => {
            if (richiesta.priorita == 0) {
              this.contatore++;
              console.log(this.contatore)
            }
          });
          if (response[1].length > 0) {
            this.listaRichieste = response[1];
            const listaCodici = response[0];
            for (let i = 0; i < response[0].length; i++)
              this.listaRichieste[i].id = listaCodici[i].codice;
          }
        }
      }
    )
  }

  public getRichiesteRecruiter(): void {
    this.richiesteService.getRichiesteAperteRecruiter().subscribe(
      (response: any[]) => {
        if (response == null) this.router.navigate(['']);
        else{
          if (response[1].length > 0) {
            this.listaRichieste = response[1];
            const listaCodici = response[0];
            for (let i = 0; i < response[0].length; i++){
              this.listaRichieste[i].id = listaCodici[i].codice;
            }
          }
        }
      }
    )
  }

  public getRichiesteCommerciale(): void {
    this.richiesteService.getRichiesteAperteCommerciale().subscribe(
      (response: any[]) => {
        if (response == null) this.router.navigate(['']);
        else{
          if (response[1].length > 0) {
            this.listaRichieste = response[1];
            const listaCodici = response[0];
            for (let i = 0; i < response[0].length; i++)
              this.listaRichieste[i].id = listaCodici[i].codice;
          }
        }
      }
    )
  }

  public getRichiesteAccount(): void {
    this.richiesteService.getRichiesteAperteAccount(this.idDipendente).subscribe(
      (response: any[]) => {
        if (response == null) this.router.navigate(['']);
        else{
          if (response[1].length > 0) {
            this.listaRichieste = response[1];
            const listaCodici = response[0];
            for (let i = 0; i < response[0].length; i++)
              this.listaRichieste[i].id = listaCodici[i].codice;
          }
        }
      }
    )
  }

  public getRichieste(): void {
    this.richiesteService.getRichiesteAperte(this.nome, this.cognome, this.idDipendente).subscribe(
      (response: any[]) => {

          if (response[1].length > 0) {
            this.listaRichieste = response[1];
            console.log(this.listaRichieste);
            const listaCodici = response[0];
            for (let i = 0; i < response[0].length; i++)
              this.listaRichieste[i].id = listaCodici[i].codice;
          }
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
    )
  }

  public goVisualizzaRichiesta(idRichiesta: number, visualizzata: boolean): void {
    if (visualizzata == false)
      this.dipendentiRichiesteService.setVisualizzato(idRichiesta, this.idDipendente).subscribe (
        (response: any) => {
          if (response == null) this.router.navigate(['']);
          else{
            this.defaultService.numeroRichieste --;
            sessionStorage.setItem("numeroRichieste", this.defaultService.numeroRichieste.toString())
            this.router.navigate(["default/pagina-visualizza-richiesta", idRichiesta, 0]);
          }
        }
      )
    else
      this.router.navigate(["default/pagina-visualizza-richiesta", idRichiesta, 0]);
  }

  public arrayPriorita(codiceRichiesta: string, priorita: number): void {
    var x = new Array();
    if (this.radioArray.length > 0) {
      var oggetto = {codiceRichiesta: codiceRichiesta, priorita: priorita};
      this.radioArray.push(oggetto);
      this.radioArray.forEach((value, index) => {
        if(value.codiceRichiesta == codiceRichiesta) {
          x.push(index);
        }
      });
    } 
    else {
      var oggetto = {codiceRichiesta: codiceRichiesta, priorita: priorita};
      this.radioArray.push(oggetto);
    }
    if (x.length == 2){
      this.radioArray[x[0]].priorita = priorita;
      this.radioArray.pop();
    }
    this.contatore ++;  //??
  }

  public salvaPriorita(): void {
    var array = JSON.parse(JSON.stringify(this.radioArray));
    this.richiesteService.salvaPriorita(array, this.ruolo).subscribe(
      (response: any) => {
        if (response == null) this.router.navigate(['']);
        else{
          alert("Invio riuscito");
        }
        this.richiesteService.getCodiciRichiesteAperteCommerciale().subscribe(
          (response: any) => {
            if (response == null) this.router.navigate([''])
            else{
              this.ngOnInit();
            }
          }
        );
      }
    )
  }
}