import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';
import { UploadExcelService } from 'src/app/service/upload-excel.service';

@Component({
  templateUrl: './upload-excel.component.html',
  styleUrls: ['upload-excel.component.scss'],
  providers: [DatePipe]
  
})
export class UploadExcelComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router, private titleService: Title, private defaultService: DefaultComponent, private datePipe: DatePipe,
              private uploadExcelService: UploadExcelService) {}

  ngOnInit(): void {
    if (this.ruolo == null)
      this.defaultService.logout();
    else
      if (this.ruolo == 'Admin'){
        this.titleService.setTitle("Gestech | Upload Excel");
        setTimeout(() => {
          this.defaultService.titoloPagina=" Upload Excel";
        }, 0)
      }
      else{
        this.router.navigate(["default/pagina-avvisi"]);
      }
  }

  uploadDataCandidati(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      let data = XLSX.utils.sheet_to_json(ws);
      this.formattaJson(data);
    };
  }

  formattaJson(data: any) {
    let array = new Array();
    array = data;

    array.forEach(element => {
      element.dataColloquio = new Date(Math.round((element.dataColloquio - 25569)*86400*1000))
      element.dataColloquio = this.datePipe.transform(element.dataColloquio, 'yyyy-MM-dd');
      if (element.cittaDiAllocazione == "0" || element.cittaDiAllocazione == null)
        element.cittaDiAllocazione = "";
    });

    this.uploadExcelService.importExcelCandidati(array).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.router.navigate(["default/pagina-upload-excel"]);
        }
      }
    )
  }

  uploadDataBeni(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      let data = XLSX.utils.sheet_to_json(ws);
      this.formattaJsonBeni(data);
    };
  }

  formattaJsonBeni(data: any) {
    let array = new Array();
    array = data;

    array.forEach(element => {
      if(isNaN(element.dataConsegna))
        element.dataConsegna = null;
      else {
        element.dataConsegna = new Date(Math.round((element.dataConsegna - 25569)*86400*1000))
        element.dataConsegna = this.datePipe.transform(element.dataConsegna, 'yyyy-MM-dd');
      }
      if(isNaN(element.dataRestituzione))
        element.dataRestituzione = null;
      else {
        element.dataRestituzione = new Date(Math.round((element.dataRestituzione - 25569)*86400*1000))
        element.dataRestituzione = this.datePipe.transform(element.dataRestituzione, 'yyyy-MM-dd');
      }
    });

    this.uploadExcelService.importExcelBeni(array).subscribe(
      (response: any) => {
        if (response.codeSession == "0") {
          sessionStorage.setItem("sessionMessage", "Sessione scaduta");
          this.defaultService.logout();
        }
        else {
          this.router.navigate(["default/pagina-upload-excel"]);
        }
      }
    )
  }
}