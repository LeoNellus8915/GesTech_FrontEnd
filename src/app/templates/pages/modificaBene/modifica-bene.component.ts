import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Beni } from 'src/app/model/beni';
import { BeniService } from 'src/app/service/beni.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './modifica-bene.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class ModificaBeneComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idBene!: number;
  public bene!: Beni;
  public listaDipendenti!: string[];
  public titoloPagina: any;

  constructor(private router: Router, private route: ActivatedRoute, private titleService: Title, private defaultService: DefaultComponent,
              private beniService: BeniService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo !== 'Admin' && this.ruolo !== 'Personale')
        this.router.navigate(["default/pagina-avvisi"]);
      else{
        this.titleService.setTitle("Gestech | Visualizza Bene");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Visualizza Bene";
        }, 0)
        this.idBene = this.route.snapshot.params['idBene'];
        this.getBene();
      }
  }

  public getBene(): void {
    this.beniService.getBeneModifica(this.idBene).subscribe(
      (response: any[]) => {
        this.bene = response[0];
        this.listaDipendenti = response[1];
      }
    )
  }

  public modificaBene(updateForm: NgForm): void {
    updateForm.value.id = this.idBene;
    this.beniService.modificaBene(updateForm.value).subscribe(
      (response: any) => {
        alert("Bene modificato con successo");
        this.router.navigate(["default/pagina-beni"]);
      }
    )
  }
}
