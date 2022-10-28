import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Beni } from 'src/app/model/beni';
import { allHardware } from 'src/app/model/mapper/allHardware';
import { allStoriciBeni } from 'src/app/model/mapper/allStoriciBeni';
import { hardware } from 'src/app/model/mapper/hardware';
import { HardwareService } from 'src/app/service/hardware.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './visualizza-bene.component.html',
  styleUrls: ['../../../../assets/css/main.beni.css']
  
})
export class VisualizzaBeneComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idHardware!: string;
  public hardware!:allHardware ;
  public listaStorico!: allStoriciBeni[];
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent,
              private route: ActivatedRoute, private hardwareService: HardwareService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
        this.titleService.setTitle("Gestech | Visualizza Bene");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Visualizza Bene";
        }, 0)
        this.idHardware = this.route.snapshot.params['idHardware'];
        console.log(this.idHardware);
        this.getHardware();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public getHardware(): void {
    this.hardwareService.getHardwareVisualizza(this.idHardware).subscribe(
      (response: any[]) => {
        if (response == null) this.router.navigate(['']);
        else{
          this.hardware = response[0];
          this.listaStorico = response[1];
        }
      }
    )
  }
}
