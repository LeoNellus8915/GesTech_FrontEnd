import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RuoliService } from 'src/app/service/ruoli.service';
import { AziendeService } from 'src/app/service/aziende.service';
import { Ruoli } from 'src/app/model/ruoli';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { Aziende } from 'src/app/model/aziende';
import { AuthService } from 'src/app/service/auth.service';
import { Md5 } from "md5-typescript";

@Component({
  templateUrl: './nuovo-utente.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class NuovoUtenteComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public listaRuoli!: Ruoli[];
  public listaAziende!: Aziende[];
  public titoloPagina: any;

  constructor(private router: Router, private ruoliService: RuoliService, private aziendeService: AziendeService,
              private titleService: Title, private defaultService: DefaultComponent, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
        this.titleService.setTitle("Gestech | Nuovo Utente");
          setTimeout(() => {
            this.defaultService.titoloPagina=" Nuovo Utente";
          }, 0)
        this.getRuoli();
        this.getAziende();
      }
        else {
          this.router.navigate(['default/pagina-avvisi']);
      }
  }

  public getRuoli(): void {
    if (this.ruolo == 'Admin')
      this.ruoliService.getRuoliDipendenteAdmin().subscribe(
        (response: Ruoli[]) => {
          this.listaRuoli = response;
        }
      )
    else
      this.ruoliService.getRuoliDipendentePersonale().subscribe(
        (response: Ruoli[]) => {
          this.listaRuoli = response;
        }
      )
  }

  public getAziende(): void {
    this.aziendeService.getAziende().subscribe(
      (response: Aziende[]) => {
        this.listaAziende = response;
      }
    )
  }

  public addUtente (addForm: NgForm): void {
    if (addForm.value.password != addForm.value.confermaPassword)
      alert("Le password non coincidono");
    else {
      addForm.value.password = Md5.init(addForm.value.password);
      this.authService.addUtente(addForm.value).subscribe(
        (response: any) => {
          if (response == 0)
            alert("Email già esistente");
          else {
            alert("Utente registrato con successo");
            this.router.navigate(['default/pagina-avvisi']);
          }
        }
      )
    }
  }
}
