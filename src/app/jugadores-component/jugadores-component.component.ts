import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Jugador } from './jugador';

@Component({
  selector: 'app-jugadores-component',
  templateUrl: './jugadores-component.component.html',
  styleUrls: ['./jugadores-component.component.css']
})
export class JugadoresComponentComponent implements OnInit {
	
	private jugadores: Array<object> = [];
	private success:boolean;
	private closeResult: string;
	private jugador:Jugador;
	private mensaje:string;

	constructor(private  apiService:  ApiService, 
		        private modalService: NgbModal
		) { }

	ngOnInit() {
		this.getPlayers();	
		this.success = false;
	}

	public getPlayers(){
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
		
		this.apiService.savePlayer(this.jugador).subscribe((response) =>{
			console.log(response);
			this.success = true;
			this.mensaje = "guardado";
			this.modalService.dismissAll();
			this.getPlayers();
		});
	}

	

	public eliminar(id, index){
		this.apiService.deletePlayer(id).subscribe((response) =>{
			console.log(response);
			this.jugadores.splice(index,1);
			this.success = true;
			this.mensaje = "eliminado";
		});
	}

}
