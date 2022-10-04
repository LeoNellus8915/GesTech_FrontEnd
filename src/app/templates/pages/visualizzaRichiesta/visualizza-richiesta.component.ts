import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { RichiesteService } from 'src/app/service/richieste.service';
import { StatiRichiesta } from 'src/app/model/stati_richiesta';
import { NgForm } from '@angular/forms';
import { allRichieste } from 'src/app/model/mapper/allRichieste';
import { allCommentiRichieste } from 'src/app/model/mapper/allCommentiRichieste';

@Component({
  templateUrl: './visualizza-richiesta.component.html',
  styleUrls: ['../../../../assets/css/main.home.css', '../../../../assets/css/main.richieste.css']
  
})
export class VisualizzaRichiestaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public idRichiesta!: number;
  public statoPagina!: number;
  public richiesta!: allRichieste;
  public statoRichiesta!: string;
  public idStatoRichiesta!: number;
  public listaStatiRichiesta!: StatiRichiesta[];
  public commentiRichiesta!: allCommentiRichieste[];
  public listaRecruiters!: string[];
  public checkArray: any[] = new Array();
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent,
              private route: ActivatedRoute, private richiesteService: RichiesteService) {}

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else
    if (this.ruolo == 'Admin' 
          || this.ruolo === 'Account' 
          || this.ruolo === 'Recruiter' 
          || this.ruolo === 'Direttore Recruiter'
          || this.ruolo === 'Direttore Commerciale'){
      this.titleService.setTitle("Gestech | Visualizza Richiesta");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Visualizza Richiesta";
      }, 0)
      this.idRichiesta = this.route.snapshot.params['idRichiesta'];
      this.statoPagina = this.route.snapshot.params['statoPagina'];
      this.getRichiesta();
      if (this.ruolo == 'Direttore Recruiter')
        this.getRecruiters();
    }
    else {
      this.router.navigate(['default/pagina-avvisi']);
    }
  }

  public array(e: any): void {
    if (e.target.checked)
      this.checkArray.push(e.target.value.toString());
    else {
      this.checkArray.forEach((value,index) => {
        if(value==e.target.value.toString()) this.checkArray.splice(index,1);
      });
    }
  }

  public getRichiesta(): void {
    this.richiesteService.getRichiesta(this.idRichiesta, this.statoPagina, this.ruolo).subscribe(
      (response: any[]) => {
        this.richiesta = response[0];
        this.statoRichiesta = response[1];
        this.idStatoRichiesta = response[2];
        this.listaStatiRichiesta = response[3];
        this.commentiRichiesta = response[4];
      }
    )
  }

  public getRecruiters(): void {
    this.richiesteService.getRecruiters().subscribe(
      (response: string[]) => {
        this.listaRecruiters = response;
      }
    )
  }

  public eliminaRichiesta(): void {
    if (confirm("Sicuro di voler eliminare questa richista?") == true)
      this.richiesteService.eliminaRichiesta(this.idRichiesta, this.statoPagina).subscribe(
        (response: any) => {
          alert("Richiesta eliminata con successo");
          if (this.statoPagina == 0)
            this.router.navigate(['default/pagina-richieste']);
          else
            this.router.navigate(['default/pagina-storico-richieste']);
        }
      )
  }

  public updateRichiesta(updateForm: NgForm): void {
    updateForm.value.listaRecruiters = this.checkArray;
    console.log(updateForm.value)
    if (updateForm.value.statoRichiesta == "")
      updateForm.value.statoRichiesta = this.idStatoRichiesta;
    if (this.ruolo == 'Direttore Recruiter' && this.statoRichiesta == 'Nuova')
      updateForm.value.statoRichiesta = "2";
    this.richiesteService.updateRichiesta(updateForm.value, this.idRichiesta, this.idDipendente, this.statoPagina, this.ruolo).subscribe(
      (response: any) => {
        alert("Richiesta aggiornata con successo");
        if (this.statoPagina == 0)
          this.router.navigate(['default/pagina-richieste']);
        else
          this.router.navigate(['default/pagina-storico-richieste']);
      }
    )
  }
}