import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RisorseService } from 'src/app/service/risorse.service';

@Component({
  templateUrl: './default.component.html',
  styleUrls: ['../../../assets/css/main.default.css']
  
})
export class DefaultComponent implements OnInit{
  public idRisorsa = sessionStorage.getItem("idRisorsa") as unknown as number;
  public nomeCognome = sessionStorage.getItem("nomeCognome") as string;
  public numeroRichieste = sessionStorage.getItem("numeroRichieste") as unknown as number;
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public azienda = sessionStorage.getItem("azienda") as string;
  public codici = sessionStorage.getItem("codici");
  public titoloPagina: any;

  constructor(private router: Router, private risorseService: RisorseService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo !== 'Dipendente' && this.ruolo !== 'Personale' && this.codici == null)
        this.risorseService.getCodiciCandidati().subscribe(
          (response: any) => {
            sessionStorage.setItem("codici", "presenti");
          }
        );
  }

  public logout(): void {
    sessionStorage.removeItem("idRisorsa");
    sessionStorage.removeItem("nomeCognome");
    sessionStorage.removeItem("numeroRichieste");
    sessionStorage.removeItem("ruolo");
    sessionStorage.removeItem("azienda");
    sessionStorage.removeItem("codici");
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
