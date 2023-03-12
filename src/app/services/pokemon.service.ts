import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl = "https://pokeapi.co/api/v2/";
  private baseDescriptionUrl = "https://pokeapi.co/api/v2/pokemon-species/";

  constructor(private http: HttpClient) { }

  getPokemons():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}pokemon?offset=0&limit=478`);
  }

  getPokemonDescription(name:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}pokemon-species/${name}`);
  }

  getPokemon(name:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}pokemon/${name}`);
  }

  getType(name:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}pokemon/${name}`);
  }
}
