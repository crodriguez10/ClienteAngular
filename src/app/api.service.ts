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
	//API_URL  =  'http://localhost:7800';
  //API_URL  = 'http://18.217.82.47:8090/devops';
  API_URL  = 'http://10.125.67.52:8090/devops';

  	constructor(private  httpClient:  HttpClient) { }

  	getPlayers(){
  		console.log(`${this.API_URL}/obtenerTodosParticipantes`);
    	return  this.httpClient.get<Jugador[]>(`${this.API_URL}/obtenerTodosParticipantes`, httpOptions);
	}

	savePlayer(jugador: Jugador): Observable<Jugador> {
  		console.log("savePlayer"+jugador.nombre);
    	return  this.httpClient.post<Jugador>(`${this.API_URL}/crearParticipante`, jugador, httpOptions);
	}

	deletePlayer(id){
  		console.log("id: "+id);
    	return  this.httpClient.delete(`${this.API_URL}/jugadores/${id}`);
	}

}
