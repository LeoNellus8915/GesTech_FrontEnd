import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { allDipendenti } from 'src/app/model/mapper/allDipendenti';

@Component({
  templateUrl: './pagina-dipendenti.component.html'
  
})
export class PaginaDipendentiComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public listaDipendenti!: allDipendenti[];
  public titoloPagina: any;

  constructor(private router: Router, private dipendentiService: DipendentiService, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
        this.allDipendenti();
        this.titleService.setTitle("Gestech | Pagina Dipendenti");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Pagina Dipendenti";
        }, 0)
      }
      else {
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public allDipendenti(): void {
    this.dipendentiService.allDipendenti().subscribe(
      (response: any[]) => {
        this.listaDipendenti = response;
        setTimeout(function () {
          $(function () {
            $('#tabellaDipendenti').DataTable({
              "language": {
                "emptyTable":     "Nessun dipendente trovato",
                "info":           " ",
                "infoEmpty":      " ",
                "lengthMenu":     "Mostra _MENU_ dipendenti",
                "loadingRecords": "Caricamento...",
                "search":         "Cerca:",
                "zeroRecords":    "Nessun dipendente trovato",
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
            " (esempio Nome Data ecc...)");
            $("#tooltip").css({"margin-left": "31%"})
            $("br").remove();
          });
          });
        });
      }
    )
  }
}
