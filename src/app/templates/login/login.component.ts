import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Md5 } from "md5-typescript";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/main.login.css']
})
export class LoginComponent implements OnInit{
  public msgCredenziali: string = "Inserisci le credenziali per accedere al sistema";

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    sessionStorage.removeItem("idRisorsa");
    sessionStorage.removeItem("nomeCognome");
    sessionStorage.removeItem("numeroRichieste");
    sessionStorage.removeItem("ruolo");
    sessionStorage.removeItem("azienda");
    sessionStorage.removeItem("codiciCandidati");
    sessionStorage.removeItem("codiciRichiesteAperteAdmin");
    sessionStorage.removeItem("codiciRichiesteAperteAccount");
    sessionStorage.removeItem("codiciRichiesteAperteCommerciale");
    sessionStorage.removeItem("codiciRichiesteAperteRecruiter");
    sessionStorage.removeItem("codiciRichiesteAperte");
    sessionStorage.removeItem("codiciRichiesteChiuse");
    sessionStorage.removeItem("codiciHardware");
    sessionStorage.removeItem("token");
  }

  public login(loginForm: NgForm): void {
    loginForm.value.password = Md5.init(loginForm.value.password);
    this.authService.login(loginForm.value).subscribe(
      (response: any) => {
        if (response != null) {
          let listaRuoli: string[] = response.ruolo.toString().split(",");
          sessionStorage.setItem("idDipendente", response.idDipendente);
          sessionStorage.setItem("nome", response.nome);
          sessionStorage.setItem("cognome", response.cognome);
          sessionStorage.setItem("azienda", response.azienda);
          sessionStorage.setItem("numeroRichieste", response.numeroRichieste);
          sessionStorage.setItem("App-Key", response.token.toString().replaceAll("-", ""));
          if (listaRuoli.length == 1) {
            sessionStorage.setItem("ruolo", listaRuoli[0]);
            this.router.navigate(["default/pagina-avvisi"]);
          }
          else
            this.router.navigate(["pagina-scelta-ruolo", JSON.stringify(listaRuoli)]); 
        }
        else
          this.msgCredenziali = "Credenziali errate, si prega di riprovare";
      }
    )
  }
}