import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CandidatiService } from 'src/app/service/candidati.service';
import { ProfiliService } from 'src/app/service/profili.service';
import { RisorseService } from 'src/app/service/risorse.service';
import { DefaultComponent } from '../../default/default.component';
import {Chart} from 'chart.js/auto';

@Component({
  templateUrl: './registro-attivita.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css']
})

export class PaginaRegistroAttivita implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;
  public listaRecruiters!: any[];
  public numeroCandidatiTotali!: number;
  public numeroCandidatiGiornalieri!: number;
  public listaProfili!: any;

  public listaPercentuali = new Array();
  public listaNumeroCandidatiGiornalieriRecruiter = new Array();
  public listaNumeroCandidatiTotaliRecruiter = new Array();

  public chart: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private risorseService: RisorseService, 
    private candidatiService: CandidatiService, private profiliService: ProfiliService) {}

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
        this.candidatiTotali();
        this.candidatiGiornalieri();
        this.getProfili();
        this.getPercentualiRuoli();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  getRecruiters() {
    this.risorseService.getRecruiters().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaRecruiters = response.dataSource;
          let recruiters = new Array();
      
          response.dataSource.forEach((recruiter: any) => {
            recruiters.push(recruiter.nome + " " + recruiter.cognome[0] + ".");
          });

          this.risorseService.countCandidatiGiornalieriByRecruiter().subscribe(
            (response: any) => {
              response.dataSource.forEach((numero: any) => {
                this.listaNumeroCandidatiGiornalieriRecruiter.push(numero);
              });

              this.risorseService.countCandidatiTotaliByRecruiter().subscribe(
                (response: any) => {
                  response.dataSource.forEach((numero: any) => {
                    this.listaNumeroCandidatiTotaliRecruiter.push(numero);
                  });
                  this.chart = new Chart("MyChart", {
                    type: 'bar',
                    data: {
                      labels: recruiters, 
                        datasets: [
                        {
                          label: "Candidati Totali",
                          data: this.listaNumeroCandidatiTotaliRecruiter,
                          backgroundColor: 'green'
                        },
                        {
                          label: "Candidati Giornalieri",
                          data: this.listaNumeroCandidatiGiornalieriRecruiter,
                          backgroundColor: 'orange'
                        }  
                      ]
                    },
                    options: {
                      aspectRatio: 1.5
                    }
                  });
                }
              )
            }
          )
        }
      }
    )
  }

  getProfili() {
    this.profiliService.getProfili().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaProfili = response.dataSource
        }
      }
    )
  }

  getPercentualiRuoli() {
    this.risorseService.getPercentualiRuoli().subscribe(
      (response: any) => {
        var totale = 0;
        response.dataSource.forEach((profilo: number) => {
          totale = totale + profilo;
        });
        this.listaProfili.forEach((profilo: any) => {
          this.listaPercentuali.push({"nomeProfilo": profilo.nome, "percentuale": Math.floor((response.dataSource[profilo.id-1] * 100) / totale)})
        });
      }
    )
  }

  candidatiTotali() {
    this.risorseService.getCandidatiTotali().subscribe(
      (response: any) => {
        this.numeroCandidatiTotali = response.dataSource;
      }
    )
  }

  candidatiGiornalieri() {
    this.risorseService.getCandidatiGiornalieri().subscribe(
      (response: any) => {
        this.numeroCandidatiGiornalieri = response.dataSource;
      }
    )
  }
}
