import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {JugadoresComponentComponent} from './jugadores-component/jugadores-component.component';
import {SorteoComponent} from './sorteo/sorteo.component';
import {PlayComponent} from './play/play.component';

const routes: Routes = [
{path:  'jugadores',  component:  JugadoresComponentComponent},
{path:  'play',  component:  PlayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
