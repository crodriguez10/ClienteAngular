import { Injectable } from '@angular/core';
import { HttpClient} from  '@angular/common/http';
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
}
