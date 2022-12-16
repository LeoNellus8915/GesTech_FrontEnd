import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { allDipendenti } from 'src/app/model/mapper/allDipendenti';
import { allStoriciBeni } from 'src/app/model/mapper/allStoriciBeni';
import { dispositivi } from 'src/app/model/mapper/dispositivi';
import { findAllDipendentiException } from 'src/app/model/mapper/findAllDipendentiException';
import { getDipendente } from 'src/app/model/mapper/getDipendente';
import { hardware } from 'src/app/model/mapper/hardware';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { HardwareService } from 'src/app/service/hardware.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './modifica-bene.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class ModificaBeneComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idHardware!: string;
  public hardware!: hardware;
  public listaDipendenti!: findAllDipendentiException[];
  public listaDispositivi!: dispositivi[];
  public listaStorico!: allStoriciBeni[];
  public dipendente!: getDipendente;
  public listaSelectDipendenti!:allDipendenti[];
  public titoloPagina: any;
  public dispositivo!: dispositivi;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title, private defaultService: DefaultComponent,
              private hardwareService: HardwareService, private dipendentiService: DipendentiService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale' || this.ruolo == 'Gestore Beni'){
        this.titleService.setTitle("Gestech | Visualizza Bene");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Visualizza Bene";
        })
        this.idHardware = this.route.snapshot.params['idHardware'];
        this.getHardware();
        this.allDispositivi();
      }
      else {
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public getHardware(): void {
    this.hardwareService.getHardwareModifica(this.idHardware).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.hardware = response.dataSource[0];
          this.dispositivo = response.dataSource[1];
          this.listaDipendenti = response.dataSource[2];
          this.listaStorico = response.dataSource[3];
        }
      }
    )
  }

  public modificaHardware(updateForm: NgForm): void {
    
    if(updateForm.value.idDispositivo == ""){
      updateForm.value.idDispositivo = this.dispositivo.id.toString();
    }

    if(updateForm.value.idPersona == ""){
      updateForm.value.idPersona = this.dipendente.id.toString();
    }

    this.hardwareService.modificaHardware(updateForm.value, this.idHardware).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          alert("Bene modificato con successo");
          this.router.navigate(["default/pagina-beni"]);
        }
      }
    )
  }

  public allDispositivi():void{
    this.hardwareService.getAllDispositivi().subscribe(
      (response: any)=> {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaDispositivi = response.dataSource;
        }
      }
    )
  }
}
