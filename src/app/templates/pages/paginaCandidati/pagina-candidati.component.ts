import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RisorseService } from 'src/app/service/risorse.service';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-candidati.component.html'
  
})
export class PaginaCandidatiComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
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
      }
  }

  public allCandidati(): void {
    this.risorseService.allCandidati().subscribe(
      (response: any[]) => {
        const candidati: string[][] = [];
        this.listaCandidati = response[0];
        const listaCodici = response[1];
        for (let i = 0; i < response[0].length; i++) {
          this.listaCandidati[i][0] = listaCodici[i].codice;
          candidati.push([this.listaCandidati[i][1].toString().replace("T", " "), 
                          this.listaCandidati[i][2], 
                          this.listaCandidati[i][3], 
                          this.listaCandidati[i][4], 
                          this.listaCandidati[i][5], 
                          this.listaCandidati[i][6],
                          '<a routerlink="../pagina-visualizza-candidato/'+this.listaCandidati[i][0]+'" ng-reflect-router-link="../pagina-visualizza-candidato/'+this.listaCandidati[i][0]+'" href="/default/pagina-visualizza-candidato/'+this.listaCandidati[i][0]+'"><i class="icon-eye mr-3"></i></a>' +
                          '<a ng-reflect-router-link="../pagina-modifica-candidato,'+this.listaCandidati[i][0]+'" href="/default/pagina-modifica-candidato/'+this.listaCandidati[i][0]+'"><i class="icon-pencil"></i></a>'
                        ]);
        }
        $('#tabellaCandidati').DataTable({
          data: candidati,
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
          }
        });
        $('.dataTables_filter input[type="search"]').css(
          {'width':'800px','display':'inline-block'}
        );
      }
    )
  }
}
