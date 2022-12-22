import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RisorseService } from 'src/app/service/risorse.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './dettaglio-recruiter.component.html',
  styleUrls: ['../../../../assets/css/main.home.css', "../../../../assets/css/main.candidati.css"]
  
})
export class PaginaDettaglioRecruiter implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;
  public idRecruiter!: number;
  public listaCandidati!: any[];

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, 
              private route: ActivatedRoute, private risorseService: RisorseService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Direttore Recruiter'){
        this.titleService.setTitle("Gestech | Dettaglio Recruiter");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Dettaglio Recruiter";
        }, 0)
        this.idRecruiter = this.route.snapshot.params['idRecruiter'];
        this.getCandidati();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  getCandidati() {
    this.risorseService.getCandidatiByRecruiter(this.idRecruiter).subscribe(
      (response: any) => {
        this.listaCandidati = response.dataSource;
        setTimeout(function () {
          $(function () {
            $('#tabellaCandidati').DataTable({
              "order": [[0, 'desc']],
              "pageLength": 100,
              "columnDefs": [
                {
                    targets: [7],
                    visible: false
                }
            ],
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

  ricercaCandidati(changeValue: NgForm) {
    var table = $('#tabellaCandidati').DataTable().destroy();
    this.risorseService.getCandidatiByRecruiterDate(this.idRecruiter, changeValue.value).subscribe(
      (response: any) => {
        this.listaCandidati = response.dataSource;
        setTimeout(function () {
          $(function () {
            $('#tabellaCandidati').DataTable({
              "order": [[0, 'desc']],
              "pageLength": 100,
              "columnDefs": [
                {
                    targets: [6],
                    visible: false
                },
                {
                  targets: [7],
                  visible: false
                }
            ],
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
    )
  }
}
