import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BeniService } from 'src/app/service/beni.service';
import { RisorseService } from 'src/app/service/risorse.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './nuovo-bene.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class NuovoBeneComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public listaDipendenti!: any[];
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, 
              private risorseService: RisorseService, private beniService: BeniService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo !== 'Admin' && this.ruolo !== 'Personale')
        this.router.navigate(["default/pagina-avvisi"]);
      else{
        this.titleService.setTitle("Gestech | Nuovo Beni");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Nuovo Beni";
        }, 0)
        this.allDipendenti();
      }
  }

  public allDipendenti(): void {
    this.risorseService.getDipendenti().subscribe(
      (response: any[]) => {
        this.listaDipendenti = response;
      }
    )
  }

  public salvaBene(addForm: NgForm): void {
    this.beniService.salvaBene(addForm.value).subscribe(
      (response: any) => {
        alert("Bene salvato con successo");
        this.router.navigate(["default/pagina-beni"]);
      }
    )
  }
}
