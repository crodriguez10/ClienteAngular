import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Jugador } from './jugadores-component/jugador';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	API_URL  =  'http://localhost:7800';

  	constructor(private  httpClient:  HttpClient) { }

  	getPlayers(){
  		//console.log(this.httpClient.get(`${this.API_URL}/jugadores`));
    	return  this.httpClient.get(`${this.API_URL}/jugadores`);
	}

	savePlayer(jugador: Jugador): Observable<Jugador> {
  		console.log("savePlayer"+jugador.nombre);
    	return  this.httpClient.post<Jugador>(`${this.API_URL}/jugadores`, jugador, httpOptions);
	}

	deletePlayer(id){
  		console.log("id: "+id);
    	return  this.httpClient.delete(`${this.API_URL}/jugadores/${id}`);
	}

}
