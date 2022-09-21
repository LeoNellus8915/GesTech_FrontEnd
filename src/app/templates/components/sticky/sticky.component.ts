import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html'
  
})
export class StickyComponent {
  marginLeft = "0px";
  public larghezza = window.innerWidth;
  

  constructor(@Inject(DOCUMENT) private document: Document){}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.larghezza = window.innerWidth;
    if (this.larghezza > 1031)
      this.marginLeft = "0px";
    if (this.larghezza < 1031 && this.document.body.classList.contains("sidebar-open"))
      this.marginLeft = "270px";
  }

  public hamburger(): void {
    if (this.larghezza > 1031)
      if (this.document.body.classList.contains("sidebar-collapse"))
        this.document.body.classList.remove("sidebar-collapse");
      else
        this.document.body.classList.add("sidebar-collapse");
    else
      if (this.document.body.classList.contains("sidebar-open")) {
        this.document.body.classList.remove("sidebar-open");
        this.marginLeft = '0px';
      }
      else {
        this.document.body.classList.add("sidebar-open");
        this.marginLeft = "270px";
      }
  }
}
