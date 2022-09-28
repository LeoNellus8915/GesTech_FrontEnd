import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidatiService } from 'src/app/service/candidati.service';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { allCandidati } from 'src/app/model/mapper/allCandidati';

@Component({
  templateUrl: './pagina-candidati.component.html'
  
})
export class PaginaCandidatiComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public listaCandidati!: allCandidati[];
  public candidati!: allCandidati[];
  public titoloPagina: any;

  constructor(private router: Router, private candidatiService: CandidatiService, private titleService: Title, private defaultService: DefaultComponent) {}

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
    this.candidatiService.allCandidati().subscribe(
      (response: any[]) => {
        const candidati: string[][] = [];
        this.listaCandidati = response[0];
        const listaCodici = response[1];
        for (let i = 0; i < this.listaCandidati.length; i++) {
          this.listaCandidati[i].id = listaCodici[i].codice;
          candidati.push([this.listaCandidati[i].dataInserimento.toString().replace("T", " "), 
                          this.listaCandidati[i].nomeCognome, 
                          this.listaCandidati[i].citta, 
                          this.listaCandidati[i].profiloNome, 
                          this.listaCandidati[i].competenzaPrincipale, 
                          this.listaCandidati[i].esitoNome,
                          '<a routerlink="../pagina-visualizza-candidato/'+this.listaCandidati[i].id+'" ng-reflect-router-link="../pagina-visualizza-candidato/'+this.listaCandidati[i].id+'" href="/default/pagina-visualizza-candidato/'+this.listaCandidati[i].id+'"><i class="icon-eye mr-3"></i></a>' +
                          '<a ng-reflect-router-link="../pagina-modifica-candidato,'+this.listaCandidati[i].id+'" href="/default/pagina-modifica-candidato/'+this.listaCandidati[i].id+'"><i class="icon-pencil"></i></a>'
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
          },
          "createdRow": function( row, data ) {
            
            if(data.toString().indexOf("Inaffidabile") != -1)
                $(row).addClass( 'tabella' );
          },
        });
        $('.dataTables_filter input[type="search"]').css(
          {'width':'800px','display':'inline-block'}
        );
      }
    )
  }
}
