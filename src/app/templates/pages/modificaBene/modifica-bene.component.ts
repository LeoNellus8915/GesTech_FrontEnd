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
  public codiceHardware!: string;
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
    this.router.navigate([""]);
  else
    if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
      this.titleService.setTitle("Gestech | Visualizza Bene");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Visualizza Bene";
      }, 0)
      this.codiceHardware = this.route.snapshot.params['idHardware'];
      this.getHardware();
      this.allDispositivi();
    }
    else{
      this.router.navigate(["default/pagina-avvisi"]);
    }
  }

  public getHardware(): void {
    this.hardwareService.getHardwareModifica(this.codiceHardware).subscribe(
      (response: any[]) => {
        
        this.hardware = response[0];
        this.dipendente = response[1];
        this.dispositivo = response[2];
        this.listaDipendenti = response[3];
        this.listaStorico = response[4];
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
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
    this.hardwareService.modificaHardware(updateForm.value, this.codiceHardware).subscribe(
      (response: any) => {
          alert("Bene modificato con successo");
          this.router.navigate(["default/pagina-beni"]);
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
    )
  }

  public allDispositivi():void{
    this.hardwareService.getAllDispositivi().subscribe(
      (response: any[])=> {

          this.listaDispositivi = response;
        
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
     
    )
  }
}
