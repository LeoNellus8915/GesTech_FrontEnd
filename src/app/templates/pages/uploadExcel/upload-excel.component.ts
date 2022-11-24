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

  uploadData(event: any) {
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

    var x = 0;

    array.forEach(element => {
      x = x + 1;
      element.dataColloquio = new Date(Math.round((element.dataColloquio - 25569)*86400*1000))
      element.dataColloquio = this.datePipe.transform(element.dataColloquio, 'yyyy-MM-dd');
      if (element.cittaDiAllocazione == "0" || element.cittaDiAllocazione == null)
        element.cittaDiAllocazione = "";
    });

    this.uploadExcelService.getRuoliDipendentePersonale(array).subscribe(
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