import { Data } from "@angular/router";

export interface allRichiesteAperte{
  id: any;
  data: Data;
  cliente: string;
  citta: string;
  costo: any;
  note: string;
  linguaggiNome: string;
  profiliNome: string;
  livelliNome: string;
  statiRichiestaNome: string;
  priorita: number;
  visualizzato: boolean;
}