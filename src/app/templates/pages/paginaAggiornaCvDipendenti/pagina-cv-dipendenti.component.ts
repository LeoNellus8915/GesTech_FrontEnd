import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Linguaggi } from 'src/app/model/linguaggi';
import { Lingue } from 'src/app/model/lingue';
import { LingueService } from 'src/app/service/lingua.service';
import { LinguaggiService } from 'src/app/service/linguaggi.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-cv-dipendenti.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class PaginaCVDipendentiComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public listaLinguaggi!: Linguaggi[];
  public listaLingue!: Lingue[];
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent,
              private linguaggiService: LinguaggiService, private lingueService: LingueService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Dipendente'){
        this.titleService.setTitle("Gestech | CV Dipendenti");
        setTimeout(() => {
          this.defaultService.titoloPagina=" CV Dipendenti";
        }, 0)
        this.getSelects();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public getSelects(): void {
    this.linguaggiService.getLinguaggi().subscribe(
      (response: Linguaggi[]) => {

          this.listaLinguaggi = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
    )
    this.lingueService.getLingue().subscribe(
      (response: Lingue[]) => {

          this.listaLingue = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
    )
  }
}
