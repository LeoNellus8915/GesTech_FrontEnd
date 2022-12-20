import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RisorseService } from 'src/app/service/risorse.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './registro-attivita.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css']
})

export class PaginaRegistroAttivita implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;
  public listaRecruiters!: any[];

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private risorseService: RisorseService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Direttore Recruiter'){
        this.titleService.setTitle("Gestech | Registro Attività");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Registro Attività";
        }, 0)
        this.getRecruiters();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  getRecruiters() {
    this.risorseService.getRecruiters().subscribe(
      (response: any) => {
        this.listaRecruiters = response.dataSource;
      }
    )
  }
}
