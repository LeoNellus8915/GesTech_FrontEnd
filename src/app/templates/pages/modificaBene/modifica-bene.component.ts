import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Beni } from 'src/app/model/beni';
import { hardware } from 'src/app/model/mapper/hardware';
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
  public listaDipendenti!: number[];
  public listaStorico!: hardware[];
  public titoloPagina: any;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title, private defaultService: DefaultComponent,
              private hardwareService: HardwareService) {}

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
    }
    else{
      this.router.navigate(["default/pagina-avvisi"]);
    }
  }

  public getHardware(): void {
    this.hardwareService.getHardwareModifica(this.codiceHardware).subscribe(
      (response: any[]) => {
        this.hardware = response[0];
        this.listaDipendenti = response[1];
        this.listaStorico = response[2];
        console.log(this.listaDipendenti);
      }
    )
  }

  public modificaHardware(updateForm: NgForm): void {
    if(updateForm.value.idPersona == ''){
      updateForm.value.idPersona = this.hardware.idPersona;
    }
    this.hardwareService.modificaHardware(updateForm.value, this.codiceHardware).subscribe(
      (response: any) => {
        alert("Bene modificato con successo");
        this.router.navigate(["default/pagina-beni"]);
      }
    )
  }
}
