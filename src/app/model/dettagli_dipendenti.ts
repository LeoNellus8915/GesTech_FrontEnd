export interface DettagliDipendenti {
  id: number;
  fileBase64: string;
  dataAssunzione: Date;
  dataFineRapporto: Date;
  idAzienda: number;
  idContratto: number;
  idLivelloContratto: number;
  idMansione: number;
  idCliente: number;
  idPeriodoDiProva: number;
  idPeriodoDiPreavviso: number;
}