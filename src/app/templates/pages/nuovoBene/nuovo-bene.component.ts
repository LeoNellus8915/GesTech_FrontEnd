import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HardwareService } from 'src/app/service/hardware.service';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { DefaultComponent } from '../../default/default.component';
import{allDipendenti} from 'src/app/model/mapper/allDipendenti';
import { dispositivi } from 'src/app/model/mapper/dispositivi';
import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './nuovo-bene.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class NuovoBeneComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public listaDipendenti!: allDipendenti[];
  public titoloPagina: any;
  public listaDispositivi!: dispositivi[];

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, 
              private dipendentiService: DipendentiService, private hardwareService: HardwareService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
        this.titleService.setTitle("Gestech | Nuovo Beni");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuovo Beni";
        }, 0)
        this.allDipendenti();
        this.allDispositivi();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public allDipendenti(): void {
    this.dipendentiService.allDipendenti().subscribe(
      (response: any[]) => {

        this.listaDipendenti = response;
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

  public salvaHardware(addForm: NgForm): void {
    if(addForm.value.dispositivi == "")
    addForm.value.dispositivi = "5";

    if(addForm.value.dipendente == "")
    addForm.value.dipendente = "10";

    if(addForm.value.dataConsegna == "")
    addForm.value.dataConsegna = formatDate(new Date(), 'yyyy-MM-dd', 'en');

   

    this.hardwareService.salvaHardware(addForm.value).subscribe(
      (response: any) => {
          alert("Bene salvato con successo");
          this.router.navigate(["default/pagina-beni"]);
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
    )
  }
}
