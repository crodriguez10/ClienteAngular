import { Component, OnInit } from '@angular/core';
import { Jugador } from '../jugadores-component/jugador';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiService } from '../api.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})

export class PlayComponent implements OnInit {
  private jugadores: Array<Jugador> = [];
  private jugador: Jugador;
  private success: boolean;
  private error: boolean;
  private estados: Array<object> = [];
  ELEMENT_DATA: Jugador[] = [];
  displayedColumns = ['select', 'id', 'nombre'];
  dataSource: MatTableDataSource<Jugador>;
  private closeResult: string;
  selection = new SelectionModel<Jugador>(true, []);

  constructor(private apiService: ApiService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.getPlayers();
    this.success = false;
    this.estados.push({ 'id': '1', 'nombre': 'activo' },
      { 'id': '0', 'nombre': 'inactivo' })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  public getPlayers() {
    this.apiService.getActivePlayers().subscribe((data: Array<Jugador>) => {
      this.ELEMENT_DATA = data;
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.jugador = {} as Jugador;
      console.log(data);
    });
  }

  openModal(content) {
    if (this.selection.selected.length == 0) {
      alert("No hay participantes sleccionados para el juego.");
    } else {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });

      let aleatorio = Math.round(Math.random() * (this.selection.selected.length - 1));
      this.jugador = this.selection.selected[aleatorio];
      console.log(this.jugador);
      this.clearList();
    }
  }

  clearList() {
    let indice = 0;
    this.ELEMENT_DATA.forEach((element, index) => {
      if (element.id == this.jugador.id) {
        indice = index;
      }
    });

    this.ELEMENT_DATA.splice(indice, 1);
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);

    this.selection.selected.forEach((element, index) => {
      if (element.id == this.jugador.id) {
        indice = index;
      }
    });
    this.selection.selected.splice(indice, 1);


  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
