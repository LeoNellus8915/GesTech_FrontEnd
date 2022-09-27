import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DipendentiService } from 'src/app/service/dipendenti.service';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-dipendenti.component.html'
  
})
export class PaginaDipendentiComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public listaDipendenti!: any[];
  public titoloPagina: any;

  constructor(private router: Router, private dipendentiService: DipendentiService, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo !== 'Admin' && this.ruolo !== 'Personale')
        this.router.navigate(["default/pagina-avvisi"]);
      else {
        this.allDipendenti();
        this.titleService.setTitle("Gestech | Pagina Dipendenti");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Pagina Dipendenti";
        }, 0)
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
          });
        }, 40);
      }
  }

  public allDipendenti(): void {
    this.dipendentiService.allDipendenti().subscribe(
      (response: any[]) => {
        this.listaDipendenti = response;
      }
    )
  }
}
