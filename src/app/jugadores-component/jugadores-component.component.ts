import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Jugador } from './jugador';
import { Estado } from './Estado';

@Component({
  selector: 'app-jugadores-component',
  templateUrl: './jugadores-component.component.html',
  styleUrls: ['./jugadores-component.component.css']
})
export class JugadoresComponentComponent implements OnInit {
	
	private jugadores: Array<object> = [];
	private success:boolean;
	private error:boolean;
	private closeResult: string;
	private jugador:Jugador;
	private mensaje:string;
	private estados: Array<object> = [];

	constructor(private  apiService:  ApiService, 
		        private modalService: NgbModal
		) { }

	ngOnInit() {
		this.getPlayers();	
		this.success = false;
		this.estados.push({'id':'1', 'nombre': 'activo'},
						  {'id':'0', 'nombre': 'inactivo'}) 
	}

	public getPlayers(){
		/*this.jugadores.push({'id':1, 'nombre': 'prueba', 'estado':'1'},
							{'id':2, 'nombre': 'prueba2', 'estado':'2'});*/
		this.apiService.getPlayers().subscribe((data:  Array<object>)=>{
			this.jugadores = data;
			this.jugador = {} as Jugador;
			console.log(data);
		});
	}

	open(content, action, jugador) {
		
		if(action == 'modificar'){
			this.jugador = jugador;
		}else{
			this.jugador = {} as Jugador;
		}

	    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
	      this.closeResult = `Closed with: ${result}`;
	    }, (reason) => {
	      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	    });
  	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
		  	return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  	return 'by clicking on a backdrop';
		} else {
		  	return  `with: ${reason}`;
		}
	}

	public guardar(){

		/*if(this.jugador.id != null && this.jugador.id != ''){

			this.eliminarJugador(this.jugador.id);
			this.jugadores.push(this.jugador);
			this.mensaje = "modificado";
		}else{
			var id = this.jugadores.length;
			this.jugador.id = (id+1).toString();
			this.jugadores.push(this.jugador);
			this.mensaje = "guardado";
		}
			this.success = true;
			this.modalService.dismissAll();*/
		this.apiService.savePlayer(this.jugador).subscribe((response) =>{
			console.log(response);
			this.success = true;
			this.mensaje = "guardado";
			this.modalService.dismissAll();
			this.getPlayers();
		},
		(error)=>{
			this.error = true;
			this.modalService.dismissAll();
		});
	}

	

	public eliminar(id, index){
		this.eliminarJugador(id);
		/*this.apiService.deletePlayer(id).subscribe((response) =>{
			console.log(response);
			this.jugadores.splice(index,1);
			this.success = true;
			this.mensaje = "eliminado";
		});*/
	}

	public eliminarJugador(id){
		for (var i = 0; i < this.jugadores.length; i++) {
			if(id == this.jugadores[i].id){
				this.jugadores.splice(i,1);
			}
		}
	}

}
