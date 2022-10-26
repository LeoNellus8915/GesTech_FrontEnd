import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';
import { AvvisiService } from 'src/app/service/avvisi.service';
import { Avvisi } from 'src/app/model/avvisi';
import { Ruoli } from 'src/app/model/ruoli';
import { RuoliService } from 'src/app/service/ruoli.service';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './avvisi.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
})
export class AvvisiComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public listaAvvisi!: Avvisi[];
  public listaRuoli!: Ruoli[];
  public checkArray: any[] = new Array();

  constructor(private titleService: Title, private defaultService: DefaultComponent,  private router: Router, 
            private avvisiService: AvvisiService, private ruoliService: RuoliService) {}

  ngOnInit(): void {
    if (this.ruolo === null)
      this.router.navigate(['']);
    else {
      this.titleService.setTitle("Gestech | Avvisi");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Avvisi";
      }, 0)
      this.getAvvisi();
      this.getRuoli();
      this.checkArray = new Array();
    }
  }

  public getRuoli(): void {
    this.ruoliService.getRuoli().subscribe(
      (response: Ruoli[]) => {
        this.listaRuoli = response;
      }
    )
  }

  public getAvvisi(): void {
    this.avvisiService.allAvvisi(this.ruolo).subscribe(
      (response: Avvisi[]) => {
        if (response == null)
          this.router.navigate([""]);
        else
          this.listaAvvisi = response;
      }
    )
  }

  public deleteAvviso(idAvviso: number): void{
    if (confirm("Vuoi eliminare questo avviso?") == true)
      this.avvisiService.deleteAvviso(idAvviso).subscribe(
        (response: any) => {
          alert("Avviso eliminato con successo");
          this.ngOnInit();
        }
      )
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

  public salvaAvviso(addForm: NgForm): void {
    if (this.checkArray.length == 0)
      alert("Inserire tutti o almeno un ruolo");
    else {
      addForm.value.ruoli = this.checkArray;
      addForm.value.idDipendente = this.idDipendente;
      this.avvisiService.salvaAvviso(addForm.value).subscribe(
        (response: any) => {
          alert("Avviso salvato con successo");
          this.ngOnInit();
          addForm.reset();
        }
      )
    }
  }
}
