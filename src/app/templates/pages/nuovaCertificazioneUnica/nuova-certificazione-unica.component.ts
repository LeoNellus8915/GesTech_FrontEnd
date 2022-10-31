import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './nuova-certificazione-unica.component.html',
  styleUrls: ['../../../../assets/css/main.dipendent.css']
  
})
export class NuovaCertificazioneUnicaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Personale' || this.ruolo == 'Admin'){
        this.titleService.setTitle("Gestech | Nuova Certificazione Unica");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuova Certificazione Unica";
        }, 0)
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }
}
