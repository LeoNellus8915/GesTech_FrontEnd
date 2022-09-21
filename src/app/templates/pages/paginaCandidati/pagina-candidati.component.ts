import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RisorseService } from 'src/app/service/risorse.service';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-candidati.component.html'
  
})
export class PaginaCandidatiComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public listaCandidati!: any[];
  public titoloPagina: any;

  constructor(private router: Router, private risorseService: RisorseService, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Personale' || this.ruolo == 'Dipendente')
        this.router.navigate(["default/pagina-avvisi"]);
      else {
        this.allCandidati();
        this.titleService.setTitle("Gestech | Pagina Candidati");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Pagina Candidati";
        }, 0)
        /*setTimeout(function () {
          $(function () {
            $('#tabellaCandidati').DataTable({
              "language": {
                "emptyTable":     "Nessun candidato trovato",
                "info":           " ",
                "infoEmpty":      " ",
                "lengthMenu":     "Mostra _MENU_ candidati",
                "loadingRecords": "Caricamento...",
                "search":         "Cerca:",
                "zeroRecords":    "Nessun candidato trovato",
                "paginate": {
                    "first":      "Ultimo",
                    "last":       "Primo",
                    "next":       "Prossimo",
                    "previous":   "Precedente"
                }
              },
            });
            $('.dataTables_filter input[type="search"]').css(
              {'width':'800px','display':'inline-block'}
            );
          });
        }, 150);*/
      }
  }

  public allCandidati(): void {
    this.risorseService.allCandidati().subscribe(
      (response: any[]) => {
        this.listaCandidati = response[0];
        const listaCodici = response[1];
        for (let i = 0; i < response[0].length; i++) {
          const candidato = this.listaCandidati[i];
          const codice = listaCodici[i];
          candidato[0] = codice.codice;
        }
        $('#tabellaCandidati').DataTable({
          "language": {
            "emptyTable":     "Nessun candidato trovato",
            "info":           " ",
            "infoEmpty":      " ",
            "lengthMenu":     "Mostra _MENU_ candidati",
            "loadingRecords": "Caricamento...",
            "search":         "Cerca:",
            "zeroRecords":    "Nessun candidato trovato",
            "paginate": {
                "first":      "Ultimo",
                "last":       "Primo",
                "next":       "Prossimo",
                "previous":   "Precedente"
            }
          },
        });
        $('.dataTables_filter input[type="search"]').css(
          {'width':'800px','display':'inline-block'}
        );
      }
    )
  }
}
