export interface DettagliCandidati {
  id: number;
  idCandidato: number;
  idPersonaRecruiter: number;
  fileBase64: string;
  dataInserimento: Date;
  profiloLinkedin: string;
  idEsitoColloquio: number;
  linguaggioCampoLibero: string;
  competenzaPrincipale: string;
  dataColloquio: Date;
  annoColloquio: number;
  fonteReperimento: string;
  costoGiornaliero: number;
  possibilitaLavorativa: string;
  competenzeTotali: string;
  certificazioni: string;

}