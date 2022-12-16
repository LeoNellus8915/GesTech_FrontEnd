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
  public titoloPagina: any;

  constructor(private router: Router, private candidatiService: CandidatiService, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Recruiter' 
            || this.ruolo == 'Direttore Recruiter' 
            || this.ruolo == 'Direttore Commerciale'){
        this.allCandidati();
        this.titleService.setTitle("Gestech | Pagina Candidati");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Pagina Candidati";
        }, 0)
      }
      else {
        this.router.navigate(["default/pagina-avvisi"]);
      }   
  }

  public allCandidati(): void {
    this.candidatiService.allCandidati().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          console.log(response.dataSource)
          this.listaCandidati = response.dataSource;
          setTimeout(function () {
            $(function () {
              $('#tabellaCandidati').DataTable({
                "order": [[0, 'desc']],
                "pageLength": 100,
                "language": {
                  "emptyTable":     "Nessun candidato trovato",
                  "info":           " ",
                  "infoEmpty":      " ",
                  "infoFiltered":   "Filtrati i _MAX_ candidati",
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
                    $(row).addClass( 'tabellaRed' );
                  if(data.toString().indexOf("Assunto") != -1)
                    $(row).addClass( 'tabellaGreen' );
                },
              });
              $('.dataTables_filter input[type="search"]').css(
                {'width':'800px','display':'inline-block'}
              );
              $("input").on("click", function(){
                $("#tooltip").text("Per effettuare una ricerca scrivere le singole parole separate da uno spazio" +
                " (esempio Città Ruolo ecc...)");
                $("#tooltip").css({"margin-left": "31%"})
                $("br").remove();
              });
            });
          });
        }
      }
    )
  }

  goVisualizzaCandidato(idCandidato: number, codiceCandidato: string) {
    this.router.navigate(["default/pagina-visualizza-candidato", codiceCandidato, 0, 0]);
    sessionStorage.setItem("idCandidato", idCandidato.toString());
  }

  goModificaCandidato(idCandidato: number, codiceCandidato: string) {
    this.router.navigate(["default/pagina-modifica-candidato", codiceCandidato, 0, 0]);
    sessionStorage.setItem("idCandidato", idCandidato.toString());
  }
}
