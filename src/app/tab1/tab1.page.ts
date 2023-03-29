import { Component, Type } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import {  TypePokemon } from '../models/typePokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  cantidadMostrar:number = 10;
  pokemones:Pokemon[] = [];
  types:TypePokemon[];
  constructor(private pokemonService:PokemonService) {
    this.getPokemons();
  }
    getPokemons(){
      this.pokemonService.getPokemons().subscribe(data =>{
        this.pokemones = data.results;
        this.getPokemon(this.pokemones);
       });
    }
    addMoreAmount(){
      this.cantidadMostrar = this.cantidadMostrar+10;
    }
    getPokemon(pokemones:Pokemon[]){
      for (let index = 0; index < pokemones.length; index++) {
         this.pokemonService.getPokemon(pokemones[index].name).subscribe(
          dataDos =>{
            for (let j = 0; j< dataDos.types.length; j++) {
               this.pokemones[index].id = dataDos.id;
               this.pokemones[index].types= dataDos.types;
               this.pokemones[index].image= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+dataDos.id+".png";
             }
          }
         );
        }
    }


   

}
