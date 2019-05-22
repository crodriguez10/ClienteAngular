import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from  '@angular/common/http';
import { Jugador } from '../app/jugadores-component/jugador';

import { ApiService } from './api.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
  });

  it('should be created', inject([ApiService], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));

  it('#getPlayers should return array of Players', 
	  	inject([ApiService], (service: ApiService) => {
	   
	  	return service.getPlayers().toPromise().then((data) =>{
	  		console.log("#getPlayers lenght jugadores: "+data.length);
	  		expect(data.length).toBeGreaterThan(0);
	  	});
	  	//console.log(jugadores);
  	

    

  }));

   it('#savePlayer should return object of player', inject([ApiService], (service: ApiService) => {
	    let  jugador:Jugador;
	 	jugador = {} as Jugador;
	    jugador.estado ="0";
	    jugador.id =1000001;
	    jugador.nombre ="TestUnit";

	     return service.savePlayer(jugador).toPromise().then((response) =>{
	    		console.log("#savePlayer id jugador: "+response.id);
				expect(response.id).toEqual(1000001);

		});
    

  }));

  it('#deletePlayer should not return object of player', inject([ApiService], (service: ApiService) => {
    let  jugador:Jugador;
 	jugador = {} as Jugador;
    jugador.id =1000001;

     return service.deletePlayer(jugador.id).toPromise().then((response) =>{
     	console.log("#deletePlayer response deletePlayer: "+JSON.stringify(response));
     	expect(response.id).toEqual(jugador.id);
     });
    

  }));

   it('#getActivePlayers should return array of Players', 
	  	inject([ApiService], (service: ApiService) => {
	   
	  	return service.getActivePlayers().toPromise().then((data) =>{
	  		console.log("#getActivePlayers length active players: "+data.length);
	  		expect(data.length).toBeGreaterThan(0);
	  	});

  }));

   it('#getActivePlayersEstado1 should return players with estado 1', 
	  	inject([ApiService], (service: ApiService) => {
	   
	  	return service.getPlayers().toPromise().then((data) =>{
	  		console.log("#getActivePlayersEstado1 estado active player: "+data[0].estado);
	  		expect(data[0].estado).toEqual(1);
	  	});

});
