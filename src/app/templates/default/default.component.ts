import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeniService } from 'src/app/service/beni.service';
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
  
  public codiciCandidati = sessionStorage.getItem("codiciCandidati");
  public codiciRichiesteAperteAccount = sessionStorage.getItem("codiciRichiesteAperteAccount");
  public codiciRichiesteAperteAdmin = sessionStorage.getItem("codiciRichiesteAperteAdmin");
  public codiciRichiesteAperteCommerciale = sessionStorage.getItem("codiciRichiesteAperteCommerciale");
  public codiciRichiesteAperteRecruiter = sessionStorage.getItem("codiciRichiesteAperteRecruiter");
  public codiciRichiesteAperte = sessionStorage.getItem("codiciRichiesteAperte");

  public codiciRichiesteChiuse = sessionStorage.getItem("codiciRichiesteChiuse");

  public titoloPagina: any;

  constructor(private router: Router, private candidatiService: CandidatiService, @Inject(DOCUMENT) private document: Document,
              private richiesteService: RichiesteService, private beniService: BeniService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else {
      if (this.ruolo !== 'Dipendente' && this.ruolo !== 'Personale' && this.codiciCandidati == null)
        this.candidatiService.getCodiciCandidati().subscribe(
          (response: any) => {
            sessionStorage.setItem("codiciCandidati", "presenti");
          }
        );
      if (this.ruolo == 'Admin' && this.codiciRichiesteAperteAdmin == null)
        this.richiesteService.getCodiciRichiesteAperteAdmin().subscribe(
          (response: any) => {
            sessionStorage.setItem("codiciRichiesteAperteAdmin", "presenti");
          }
        );
      if (this.ruolo == 'Account' && this.codiciRichiesteAperteAccount == null)
        this.richiesteService.getCodiciRichiesteAperteAccount(this.idDipendente).subscribe(
          (response: any) => {
            sessionStorage.setItem("codiciRichiesteAperteAccount", "presenti");
          }
        );
      if (this.ruolo == 'Direttore Commerciale' && this.codiciRichiesteAperteCommerciale == null)
        this.richiesteService.getCodiciRichiesteAperteCommerciale().subscribe(
          (response: any) => {
            sessionStorage.setItem("codiciRichiesteAperteCommerciale", "presenti");
          }
        );
      if (this.ruolo == 'Direttore Recruiter' && this.codiciRichiesteAperteRecruiter == null)
        this.richiesteService.getCodiciRichiesteAperteRecruiter().subscribe(
          (response: any) => {
            sessionStorage.setItem("codiciRichiesteAperteRecruiter", "presenti");
          }
        );
      if (this.ruolo == 'Recruiter' && this.codiciRichiesteAperte == null)
        this.richiesteService.getCodiciRichiesteAperte(this.nome, this.cognome).subscribe(
          (response: any) => {
            sessionStorage.setItem("codiciRichiesteAperte", "presenti");
          }
        );
      if (this.ruolo !== 'Dipendente' && this.ruolo !== 'Personale' && this.ruolo !== 'Recruiter' && this.codiciRichiesteChiuse == null)
        this.richiesteService.getCodiciRichiesteChiuse().subscribe(
          (response: any) => {
            sessionStorage.setItem("codiciRichiesteChiuse", "presenti");
          }
        );
    }
  }

  public logout(): void {
    sessionStorage.removeItem("idRisorsa");
    sessionStorage.removeItem("nomeCognome");
    sessionStorage.removeItem("numeroRichieste");
    sessionStorage.removeItem("ruolo");
    sessionStorage.removeItem("azienda");
    sessionStorage.removeItem("codiciCandidati");
    sessionStorage.removeItem("codiciRichiesteAperteAdmin");
    sessionStorage.removeItem("codiciRichiesteAperteAccount");
    sessionStorage.removeItem("codiciRichiesteAperteCommerciale");
    sessionStorage.removeItem("codiciRichiesteAperteRecruiter");
    sessionStorage.removeItem("codiciRichiesteAperte");
    sessionStorage.removeItem("codiciRichiesteChiuse");

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
