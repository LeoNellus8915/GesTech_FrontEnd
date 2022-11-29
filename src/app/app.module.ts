import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderComponent } from './templates/components/loader/loader.component';
import { StickyComponent } from './templates/components/sticky/sticky.component';
import { DataTablesModule } from "angular-datatables";

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    LoaderComponent,
    StickyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}], 
  bootstrap: [AppComponent]
})
export class AppModule { }