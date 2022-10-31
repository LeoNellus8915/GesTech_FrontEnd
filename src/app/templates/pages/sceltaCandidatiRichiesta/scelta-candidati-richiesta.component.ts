import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidatiService } from 'src/app/service/candidati.service';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { allCandidati } from 'src/app/model/mapper/allCandidati';
import { RichiesteService } from 'src/app/service/richieste.service';

@Component({
  templateUrl: './scelta-candidati-richiesta.component.html',
  styleUrls: ['../../../../assets/css/main.richieste.css', '../../../../assets/css/main.home.css']
  
})
export class PaginaSceltaCandidatiRichiestaComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public listaCandidati!: allCandidati[];
  public candidati!: allCandidati[];
  public checkArray: any[] = new Array();
  public checkNomi: any[] = new Array();
  public idRichiesta!: number;
  public titoloPagina: any;

  constructor(private router: Router, private candidatiService: CandidatiService, private titleService: Title, private defaultService: DefaultComponent,
              private route: ActivatedRoute, private richiesteService: RichiesteService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Recruiter'){
        this.allCandidati();
        this.titleService.setTitle("Gestech | Scelta Candidati Richiesta");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Scelta Candidati Richiesta";
        })
        this.idRichiesta = this.route.snapshot.params['idRichiesta'];
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
          this.listaCandidati = response.dataSource;
          setTimeout(function () {
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
                "createdRow": function( row, data ) {
                  if(data.toString().indexOf("Inaffidabile") != -1)
                      $(row).addClass( 'tabella' );
                },
              });
              $('.dataTables_filter input[type="search"]').css(
                {'width':'800px','display':'inline-block'}
              );
              $("input[type='search']").on("click", function () {
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

  public array(e: any): void {
    if (e.target.checked){
      this.checkArray.push(e.target.value.toString());
      this.listaCandidati.forEach(candidato => {
        if (candidato.id == e.target.value)
          this.checkNomi.push(candidato.cognome + " " + candidato.nome)
      });
    }
    else {
      this.checkArray.forEach((value, index) => {
        if(value==e.target.value.toString()) {
          this.checkArray.splice(index, 1);
          this.checkNomi.splice(index, 1);
        }
      });
    }
  }

  public riepilogo(): void {
    const button = document.createElement('button');
    const container = document.getElementById("container");
    button.style.visibility = "hidden";
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#candidatiModal');
    container?.appendChild(button);
    button.click();
  }

  public assegnazione(): void {
    if (this.checkArray.length == 0)
      alert("Selezionare almeno un candidato");
    else {
      this.richiesteService.assegnazioneCandidati(this.checkArray.toString(), this.idRichiesta).subscribe(
        (response: any) => {
          if (response.codeSession == "0") {
            sessionStorage.setItem("sessionMessage", "Sessione scaduta");
            this.defaultService.logout();
          }
          else {
            alert("Candidati assegnati con successo");
            const button = document.createElement('button');
            const modal = document.getElementById("candidatiModal");
            button.style.visibility = "hidden";
            button.setAttribute('data-dismiss', 'modal');
            modal?.appendChild(button);
            button.click();
            this.router.navigate(["default/pagina-richieste"]);
          }
        }
      )
    }
  }
}