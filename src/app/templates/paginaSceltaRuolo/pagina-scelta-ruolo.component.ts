import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { DipendentiCCNLService } from 'src/app/service/dipendenti-ccnl.service';

@Component({
  templateUrl: './pagina-scelta-ruolo.component.html',
  styleUrls: ['../../../assets/css/main.login.css']
  
})
export class PaginaSceltaRuoloComponent implements OnInit{
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public ruolo!: string;
  public listaRuoli!: string[];
  public titoloPagina: any;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private dipendentiCCNLService: DipendentiCCNLService) {}

  ngOnInit(): void {
    this.ruolo = this.route.snapshot.params['ruolo'];
    if (this.ruolo == null)
      this.router.navigate([""]);
    else {
      this.listaRuoli = this.ruolo.replace(/["]/g,'').replace("[",'').replace("]",'').split(',');
      //this.controlloDownload();
    }
  }

  public sceltaRuolo(ruolo: string): void {
    sessionStorage.setItem("ruolo", ruolo);
    this.router.navigate(["default/pagina-avvisi"]);
  }

  public controlloDownload(): void {
    this.dipendentiCCNLService.controlloDownload(this.idDipendente).subscribe(
      (response: any[]) => {
          if (response[0] != null) {
            const button = document.createElement('button');
            const container = document.getElementById("container");
            button.style.visibility = "hidden";
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#controlloModal');
            button.setAttribute('data-backdrop', 'static');
            button.setAttribute('data-keyboard', 'false');
            container?.appendChild(button);
            button.click();
          
        }
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
    )
  }

  public download(): void {
    this.dipendentiCCNLService.download(this.idDipendente).subscribe(
      (response: any) => {
  
          const button = document.createElement('button');
          const container = document.getElementById("controlloModal");
          button.style.visibility = "hidden";
          button.setAttribute('data-dismiss', 'modal');
          button.setAttribute('aria-label', 'close');
          container?.appendChild(button);
          button.click();
          alert("Download eseguito con successo. Ora puoi accedere al gestionale");
        },
        (error: HttpErrorResponse) => {
          this.router.navigate(['']);
        }
    )
  }
}
