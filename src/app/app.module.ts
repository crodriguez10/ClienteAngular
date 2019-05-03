import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JugadoresComponentComponent } from './jugadores-component/jugadores-component.component';
import {AppRoutingModule} from  './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SorteoComponent } from './sorteo/sorteo.component';

@NgModule({
  declarations: [
    AppComponent,
    JugadoresComponentComponent,
    SorteoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
