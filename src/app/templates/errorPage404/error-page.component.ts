import { Component } from '@angular/core';

@Component({
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent{
  public ruolo = sessionStorage.getItem("ruolo") as string;
}
