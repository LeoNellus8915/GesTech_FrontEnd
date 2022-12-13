import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';
import { AvvisiService } from 'src/app/service/avvisi.service';
import { Avvisi } from 'src/app/model/avvisi';
import { Ruoli } from 'src/app/model/ruoli';
import { RuoliService } from 'src/app/service/ruoli.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from 'src/app/model/ticket';
import { TicketAperti } from 'src/app/model/mapper/ticketAperti';
import { TicketChiusi } from 'src/app/model/mapper/ticketChiusi';

@Component({
  templateUrl: './ticket.component.html',
  styleUrls: ['../../../../assets/css/main.home.css'],
})
export class TicketComponent implements OnInit {
  public ruolo = sessionStorage.getItem('ruolo') as string;
  public idDipendente = sessionStorage.getItem('idDipendente') as unknown as number;
  public listaTicketsAperti!: TicketAperti[];
  public listaTicketsChiusi!: TicketChiusi[];

  constructor(
    private titleService: Title,
    private defaultService: DefaultComponent,
    private ticketService: TicketService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.ruolo === null) 
      this.defaultService.logout();
    else {
      this.titleService.setTitle('Gestech | Ticket');
      setTimeout(() => {
        this.defaultService.titoloPagina = ' Ticket';
      });
      if (this.ruolo == "Admin") {
        console.log(this.ruolo)
        this.getTicketsAperti();
        this.getTicketsChiusi();
      }
    }
  }

  getTicketsAperti() {
    this.ticketService.getTicketsAperti().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaTicketsAperti = response.dataSource;
        }
      }
    )
  }

  getTicketsChiusi() {
    this.ticketService.getTicketsChiusi().subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.listaTicketsChiusi = response.dataSource;
        }
      }
    )
  }

  salvaTicket(addForm: NgForm) {
    addForm.value.idDipendente = this.idDipendente;
    this.ticketService.saveTicket(addForm.value).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          alert("Ticket inviato con successo");
          this.ngOnInit();
        }
      }
    )
  }

  chiudiTicket(idTicket: number) {
    if (confirm("Vuoi chiudere questo ticket?") == true) {
      this.ticketService.chiudiTicket(idTicket).subscribe(
        (response: any) => {
          if (response.codeSession == "0") {
            sessionStorage.setItem("sessionMessage", "Sessione scaduta");
            this.defaultService.logout();
          }
          else {
            alert("Ticket chiuso con successo");
            this.ngOnInit();
          }
        }
      )
    }
  }
}
