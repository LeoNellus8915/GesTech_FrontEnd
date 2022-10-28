import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Beni } from 'src/app/model/beni';
import { allDipendenti } from 'src/app/model/mapper/allDipendenti';
import { allHardware } from 'src/app/model/mapper/allHardware';
import { dispositivi } from 'src/app/model/mapper/dispositivi';
import { hardware } from 'src/app/model/mapper/hardware';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { HardwareService } from 'src/app/service/hardware.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-beni.component.html'
  
})
export class PaginaBeniComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public listaHardware!: allHardware[];
  public listaDipendenti!: allDipendenti[];
  public listaDispositivi!: dispositivi[];
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private hardwareService: HardwareService, private dipendentiService: DipendentiService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
        this.titleService.setTitle("Gestech | Pagina Beni");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Pagina Beni";
        }, 0)
        this.allHardware();
        

      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }


  public allHardware(): void {
    this.hardwareService.allHardware().subscribe(
      (response: any[]) => {
          this.listaHardware = response[0];
          const listaCodici = response[1];
          for (let i = 0; i < response[0].length; i++)
            this.listaHardware[i].id = listaCodici[i].codice;
          setTimeout(function () {
            $(function () {
              $('#tabellaBeni').DataTable({
                "language": {
                  "emptyTable":     "Nessun bene trovato",
                  "info":           " ",
                  "infoEmpty":      " ",
                  "lengthMenu":     "Mostra _MENU_ beni",
                  "loadingRecords": "Caricamento...",
                  "search":         "Cerca:",
                  "zeroRecords":    "Nessun bene trovato",
                  "paginate": {
                      "first":      "Ultimo",
                      "last":       "Primo",
                      "next":       "Prossimo",
                      "previous":   "Precedente"
                  }
                }
              });
              $('.dataTables_filter input[type="search"]').css(
                {'width':'800px','display':'inline-block'}
              );
              $("input").on("click", function(){
              $("#tooltip").text("Per effettuare una ricerca scrivere le singole parole separate da uno spazio" +
              " (esempio: dispositivo marca ecc...)");
              $("#tooltip").css({"margin-left": "31%"})
              $("br").remove();
            });
            });
          });
      },
      (error: HttpErrorResponse) => {
        this.router.navigate(['']);
      }
    )
  }
}
