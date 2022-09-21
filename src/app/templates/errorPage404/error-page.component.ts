import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent{
  public ruolo = sessionStorage.getItem("ruolo") as string;
}
