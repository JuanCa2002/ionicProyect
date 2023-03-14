import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-detalles-pokemon',
  templateUrl: './detalles-pokemon.component.html',
  styleUrls: ['./detalles-pokemon.component.scss'],
})
export class DetallesPokemonComponent implements OnInit {
  id:string;
  pokemon:Pokemon;

  constructor(private activateRoute:ActivatedRoute, private pokemonService:PokemonService) {
     this.activateRoute.params.subscribe(params=>{
         this.id = params['id'];
         this.buscarInformacionPokemon(this.id);
         console.log(this.pokemon);
     })
   }

  ngOnInit() {}

  buscarInformacionPokemon(id:string){
    this.pokemonService.getPokemon(id).subscribe(data =>{
      this.pokemon.name = data.name;
      this.pokemon.id = data.id;
      this.pokemon.image= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+data.id+".png";
      this.pokemon.typesPokemon = data.types;
      for (let j = 0; j < data.flavor_text_entries.length; j++) {
        if(data.flavor_text_entries[j].language.name == 'es'){
          this.pokemon.description =data.flavor_text_entries[j].flavor_text;
          break;
        }
      } 
    });
  }

}
