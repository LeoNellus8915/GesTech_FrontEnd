import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './nuovo-ccnl.component.html'
  
})
export class NuovoCCNLComponent implements OnInit{
  public ruolo: string = sessionStorage.getItem("ruolo") as string;
  public titoloPagina: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
      if (this.ruolo == null)
        this.router.navigate([""]);
  }
}
