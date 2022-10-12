import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DefaultComponent } from '../../default/default.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { Md5 } from "md5-typescript";

@Component({
  templateUrl: './modifica-password.component.html',
  styleUrls: ['../../../../assets/css/main.home.css']
  
})
export class ModificaPasswordComponent implements OnInit{
  public ruolo = sessionStorage.getItem("ruolo") as string;
  public idDipendente = sessionStorage.getItem("idDipendente") as unknown as number;
  public titoloPagina: any;

  constructor(private router: Router, private authService: AuthService, private titleService: Title, private defaultService: DefaultComponent) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.router.navigate([""]);
    else {
      this.titleService.setTitle("Gestech | Modifica Password");
      setTimeout(() => {
        this.defaultService.titoloPagina=" Modifica Password";
      }, 0)
    }
  }

  public cambiaPassword(updateForm: NgForm): void {
    if (updateForm.value.password != updateForm.value.confermaPassword)
      alert("Le password non coincidono");
    else {
      updateForm.value.idDipendente = this.idDipendente;
      updateForm.value.password = Md5.init(updateForm.value.password);
      this.authService.cambiaPassword(updateForm.value).subscribe(
        (response: any) => {
          alert("Password modificata con successo");
          this.router.navigate(["default/pagina-avvisi"]);
        }
      )
    }
  }
}
