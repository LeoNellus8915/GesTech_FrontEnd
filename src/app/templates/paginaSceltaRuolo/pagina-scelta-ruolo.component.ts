import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { RisorseCCNLService } from 'src/app/service/risorse-ccnl.service';

@Component({
  templateUrl: './pagina-scelta-ruolo.component.html',
  styleUrls: ['../../../assets/css/main.login.css']
  
})
export class PaginaSceltaRuoloComponent implements OnInit{
  public idRisorsa = sessionStorage.getItem("idRisorsa") as unknown as number;
  public ruolo!: string;
  public listaRuoli!: string[];
  public titoloPagina: any;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private risorseCCNLService: RisorseCCNLService) {}

  ngOnInit(): void {
    this.ruolo = this.route.snapshot.params['ruolo'];
    if (this.ruolo == null)
      this.router.navigate([""]);
    else {
      this.listaRuoli = this.ruolo.replace(/["]/g,'').replace("[",'').replace("]",'').split(',');
      this.controlloDownload();
    }
  }

  public sceltaRuolo(ruolo: string): void {
    sessionStorage.setItem("ruolo", ruolo);
    this.router.navigate(["default/pagina-avvisi"]);
  }

  public controlloDownload(): void {
    this.risorseCCNLService.controlloDownload(this.idRisorsa).subscribe(
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
      }
    )
  }

  public download(): void {
    this.risorseCCNLService.download(this.idRisorsa).subscribe(
      (response: any) => {
        const button = document.createElement('button');
        const container = document.getElementById("controlloModal");
        button.style.visibility = "hidden";
        button.setAttribute('data-dismiss', 'modal');
        button.setAttribute('aria-label', 'close');
        container?.appendChild(button);
        button.click();
        alert("Download eseguito con successo. Ora puoi accedere al gestionale");
      }
    )
  }
}
