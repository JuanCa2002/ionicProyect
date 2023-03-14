import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-buscador-pokemon',
  templateUrl: './buscador-pokemon.component.html',
  styleUrls: ['./buscador-pokemon.component.scss'],
})
export class BuscadorPokemonComponent implements OnInit {
  termino:string;
  pokemones: Pokemon[] = [];
  pokemonesEncontrados : Pokemon[] = [];
  constructor(private activatedRoute:ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe(data=>{
      this.pokemones = data.results;
      this.getPokemon(this.pokemones);
      this.activatedRoute.params.subscribe(params =>{
        this.termino = params['termino'];
        this.pokemonesEncontrados = this.buscarPokemon(this.termino);
        console.log(this.pokemonesEncontrados);
      });
    });
  }


  getPokemon(pokemones:Pokemon[]){
    for (let index = 0; index < pokemones.length; index++) {
       this.pokemonService.getPokemon(pokemones[index].name).subscribe(
        dataDos =>{
             this.pokemones[index].id = dataDos.id;
             this.pokemones[index].image= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+dataDos.id+".png";
             this.pokemones[index].typesPokemon= dataDos.types;
        }
       );
      }
  }

  buscarPokemon(termino:string):Pokemon[]{
    let pokemonesEncontrados: Pokemon[]=[]
    termino= termino.toLowerCase();
    for(let pokemon of this.pokemones){
      let name=pokemon.name.toLowerCase();
      if(name.indexOf(termino)>=0){
        pokemonesEncontrados.push(pokemon);
      }
    }
    return pokemonesEncontrados;
  }

}
