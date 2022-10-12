import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './templates/default/default.component';
import { ErrorPageComponent } from './templates/errorPage404/error-page.component';
import { LoginComponent } from './templates/login/login.component';
import { AvvisiComponent } from './templates/pages/avvisi/avvisi.component';
import { ModificaBeneComponent } from './templates/pages/modificaBene/modifica-bene.component';
import { ModificaCandidatoComponent } from './templates/pages/modificaCandidato/modifica-candidato.component';
import { ModificaPasswordComponent } from './templates/pages/modificaPassword/modifica-password.component';
import { NuovaBustaPagaComponent } from './templates/pages/nuovaBustaPaga/nuova-busta-paga.component';
import { NuovaCertificazioneUnicaComponent } from './templates/pages/nuovaCertificazioneUnica/nuova-certificazione-unica.component';
import { NuovaRichiestaComponent } from './templates/pages/nuovaRichiesta/nuova-richiesta.component';
import { NuovoBeneComponent } from './templates/pages/nuovoBene/nuovo-bene.component';
import { NuovoCandidatoComponent } from './templates/pages/nuovoCandidato/nuovo-candidato.component';
import { NuovoCCNLComponent } from './templates/pages/nuovoCCNL/nuovo-ccnl.component';
import { NuovoUtenteComponent } from './templates/pages/nuovoUtente/nuovo-utente.component';
import { PaginaBeniComponent } from './templates/pages/paginaBeni/pagina-beni.component';
import { PaginaBustePagaComponent } from './templates/pages/paginaBustePaga/pagina-buste-paga.component';
import { PaginaCandidatiComponent } from './templates/pages/paginaCandidati/pagina-candidati.component';
import { PaginaCCNLComponent } from './templates/pages/paginaCCNL/pagina-ccnl.component';
import { PaginaCertificazioniUnicheComponent } from './templates/pages/paginaCertificazioniUniche/pagina-certificazioni-uniche.component';
import { PaginaCVDipendentiComponent } from './templates/pages/paginaAggiornaCvDipendenti/pagina-cv-dipendenti.component';
import { PaginaDipendentiComponent } from './templates/pages/paginaDipendenti/pagina-dipendenti.component';
import { PaginaRapportinoComponent } from './templates/pages/paginaRapportino/pagina-rapportino.component';
import { PaginaRichiesteComponent } from './templates/pages/paginaRichieste/pagina-richieste.component';
import { PaginaStoricoRichiesteComponent } from './templates/pages/paginaStoricoRichieste/pagina-storico-richieste.component';
import { VisualizzaBeneComponent } from './templates/pages/visualizzaBene/visualizza-bene.component';
import { VisualizzaCandidatoComponent } from './templates/pages/visualizzaCandidato/visualizza-candidato.component';
import { VisualizzaRichiestaComponent } from './templates/pages/visualizzaRichiesta/visualizza-richiesta.component';
import { PaginaSceltaRuoloComponent } from './templates/paginaSceltaRuolo/pagina-scelta-ruolo.component';
import { PaginaModulisticaComponent } from './templates/pages/paginaModulistica/pagina-modulistica.component';
import { PaginaSceltaCandidatiRichiestaComponent } from './templates/pages/sceltaCandidatiRichiesta/scelta-candidati-richiesta.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "pagina-scelta-ruolo/:ruolo", component: PaginaSceltaRuoloComponent},
  {path: "default", component: DefaultComponent, children: [
    {path: "pagina-avvisi", component: AvvisiComponent},
    {path: "pagina-modifica-bene/:idBene", component: ModificaBeneComponent},
    {path: "pagina-modifica-candidato/:idCandidato/:pagina/:idRichiesta", component: ModificaCandidatoComponent},
    {path: "pagina-modifica-password", component: ModificaPasswordComponent},
    {path: "pagina-nuova-busta-paga", component: NuovaBustaPagaComponent},
    {path: "pagina-nuova-certificazione-unica", component: NuovaCertificazioneUnicaComponent},
    {path: "pagina-nuova-richiesta", component: NuovaRichiestaComponent},
    {path: "pagina-nuovo-bene", component: NuovoBeneComponent},
    {path: "pagina-nuovo-candidato", component: NuovoCandidatoComponent},
    {path: "pagina-nuovo-ccnl", component: NuovoCCNLComponent},
    {path: "pagina-nuovo-utente", component: NuovoUtenteComponent},
    {path: "pagina-beni", component: PaginaBeniComponent},
    {path: "pagina-buste-paga", component: PaginaBustePagaComponent},
    {path: "pagina-candidati", component: PaginaCandidatiComponent},
    {path: "pagina-modulistica", component: PaginaModulisticaComponent},
    {path: "pagina-ccnl", component: PaginaCCNLComponent},
    {path: "pagina-certificazioni-uniche", component: PaginaCertificazioniUnicheComponent},
    {path: "pagina-cv-dipendenti", component: PaginaCVDipendentiComponent},
    {path: "pagina-dipendenti", component: PaginaDipendentiComponent},
    {path: "pagina-rapportino", component: PaginaRapportinoComponent},
    {path: "pagina-richieste", component: PaginaRichiesteComponent},
    {path: "pagina-storico-richieste", component: PaginaStoricoRichiesteComponent},
    {path: "pagina-visualizza-bene/:idBene", component: VisualizzaBeneComponent},
    {path: "pagina-visualizza-candidato/:idCandidato/:pagina/:idRichiesta", component: VisualizzaCandidatoComponent},
    {path: "pagina-visualizza-richiesta/:idRichiesta/:statoPagina", component: VisualizzaRichiestaComponent},
    {path: "pagina-scelta-candidati-richiesta/:idRichiesta", component: PaginaSceltaCandidatiRichiestaComponent}
  ]},
  {path:"**", component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [LoginComponent, DefaultComponent, ErrorPageComponent, AvvisiComponent, PaginaSceltaRuoloComponent,
  ModificaBeneComponent, ModificaCandidatoComponent, ModificaPasswordComponent, NuovaBustaPagaComponent, NuovaCertificazioneUnicaComponent,
  NuovaRichiestaComponent, NuovoBeneComponent, NuovoCandidatoComponent, NuovoCCNLComponent, NuovoUtenteComponent, PaginaBeniComponent,  
  PaginaBustePagaComponent, PaginaCandidatiComponent, PaginaCCNLComponent, PaginaCertificazioniUnicheComponent, PaginaCVDipendentiComponent,
  PaginaDipendentiComponent, PaginaRapportinoComponent, PaginaRichiesteComponent, PaginaStoricoRichiesteComponent, VisualizzaBeneComponent,
  VisualizzaCandidatoComponent, VisualizzaRichiestaComponent, PaginaModulisticaComponent, PaginaSceltaCandidatiRichiestaComponent]