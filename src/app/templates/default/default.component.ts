import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardwareService } from 'src/app/service/hardware.service';
import { RichiesteService } from 'src/app/service/richieste.service';
import { CandidatiService } from 'src/app/service/candidati.service';

@Component({
  templateUrl: './default.component.html',
  styleUrls: ['../../../assets/css/main.default.css']
  
})
export class DefaultComponent implements OnInit{
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public nome = sessionStorage.getItem("nome") as string;
  public cognome = sessionStorage.getItem("cognome") as string;
  public numeroRichieste = sessionStorage.getItem("numeroRichieste") as unknown as number;
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public azienda = sessionStorage.getItem("azienda") as string;

  public titoloPagina: any;

  constructor(private router: Router, private candidatiService: CandidatiService, @Inject(DOCUMENT) private document: Document,
              private richiesteService: RichiesteService, private hardwareService: HardwareService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.logout();
  }

  public logout(): void {
    sessionStorage.removeItem("idRisorsa");
    sessionStorage.removeItem("nomeCognome");
    sessionStorage.removeItem("numeroRichieste");
    sessionStorage.removeItem("ruolo");
    sessionStorage.removeItem("azienda");
    sessionStorage.removeItem("App-Key");
    sessionStorage.removeItem("idCandidato")

    this.router.navigate([""]);
  }

  public dashboard(li: string, ul: string){
    if (this.document.getElementById(li)?.classList.contains("active"))
      this.document.getElementById(li)?.classList.remove("active");
    else
      this.document.getElementById(li)?.classList.add("active");

    if (this.document.getElementById(ul)?.classList.contains("menu-open"))
      this.document.getElementById(ul)?.classList.remove("menu-open");
    else
      this.document.getElementById(ul)?.classList.add("menu-open");
  }
}
