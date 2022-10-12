export interface DettagliCandidati {
  id: number;
  idCandidato: number;
  fileBase64: string;
  dataInserimento: Date;
  idEsitoColloquio: number;
  idProfilo: number;
  idLinguaggio1: number;
  idLinguaggio2: number;
  idLinguaggio3: number;
  idLinguaggio4: number;
  idLinguaggio5: number;
  idLingua1: number;
  idLingua2: number;
  idLingua3: number;
  idLivello: number;
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