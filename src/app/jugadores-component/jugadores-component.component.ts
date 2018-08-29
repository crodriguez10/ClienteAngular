import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
//import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-jugadores-component',
  templateUrl: './jugadores-component.component.html',
  styleUrls: ['./jugadores-component.component.css']
})
export class JugadoresComponentComponent implements OnInit {
	
	private jugadores: Array<object> = [];
	private flagModal:boolean;
	private closeResult: string;

	constructor(private  apiService:  ApiService
		//, private modalService: NgbModal
		) { }

	ngOnInit() {
		this.getPlayers();	
		this.flagModal = false;
	}

	public getPlayers(){
		this.apiService.getPlayers().subscribe((data:  Array<object>)=>{
			this.jugadores = data;
			console.log(data);
		});
	}
/*
	open(content) {
		console.log("open modal");
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
	}*/

}
