import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JugadoresComponentComponent} from './jugadores-component/jugadores-component.component';

const routes: Routes = [
{path:  'jugadores',  component:  JugadoresComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }