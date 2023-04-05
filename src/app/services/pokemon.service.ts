import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = "https://pokeapi.co/api/v2/";

  constructor(private http: HttpClient) { }

  getPokemons(){
    return this.http.get<any>(`${this.baseUrl}pokemon?offset=0&limit=1010`);
  }

  getPokemonDescription(name:string){
    return this.http.get<any>(`${this.baseUrl}pokemon-species/${name}`);
  }

  getPokemon(name:string){
    return this.http.get<any>(`${this.baseUrl}pokemon/${name}`);
  }

  getPokemonsByType(name:string){
    return this.http.get<any>(`${this.baseUrl}type/${name}`);
  }
  
  getEvolutionChain(id:number){
    return this.http.get<any>(`${this.baseUrl}evolution-chain/${id}`);
  }
}
