import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Beni } from 'src/app/model/beni';
import { BeniService } from 'src/app/service/beni.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './visualizza-bene.component.html',
  styleUrls: ['../../../../assets/css/main.beni.css']
  
})
export class VisualizzaBeneComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idBene!: number;
  public bene!: Beni;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent,
              private route: ActivatedRoute, private beniService: BeniService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
        this.titleService.setTitle("Gestech | Visualizza Bene");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Visualizza Bene";
        }, 0)
        this.idBene = this.route.snapshot.params['idBene'];
        this.getBene();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public getBene(): void {
    this.beniService.getBeneVisualizza(this.idBene).subscribe(
      (response: Beni) => {
        this.bene = response;
      }
    )
  }
}
