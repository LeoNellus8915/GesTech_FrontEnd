import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Beni } from 'src/app/model/beni';
import { BeniService } from 'src/app/service/beni.service';
import { DefaultComponent } from '../../default/default.component';

@Component({
  templateUrl: './pagina-beni.component.html'
  
})
export class PaginaBeniComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public listaBeni!: Beni[];
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private beniService: BeniService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else
      if (this.ruolo == 'Admin' || this.ruolo == 'Personale'){
        this.titleService.setTitle("Gestech | Pagina Beni");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Pagina Beni";
        }, 0)
        this.allBeni();
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  public allBeni(): void {
    this.beniService.allBeni().subscribe(
      (response: any[]) => {
        this.listaBeni = response[0];
        const listaCodici = response[1];
        for (let i = 0; i < response[0].length; i++)
          this.listaBeni[i].id = listaCodici[i].codice;
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
      }
    )
  }
}
