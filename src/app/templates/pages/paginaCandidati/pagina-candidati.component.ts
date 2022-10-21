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
      this.router.navigate([""]);
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
      (response: any[]) => {
        console.log(response)
        this.listaCandidati = response[0];
        const listaCodici = response[1];
        for (let i = 0; i < response[0].length; i++)
          this.listaCandidati[i].id = listaCodici[i].codice;
        setTimeout(function () {
          $(function () {
            $('#tabellaCandidati').DataTable({
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
                    $(row).addClass( 'tabella' );
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
    )
  }
}
