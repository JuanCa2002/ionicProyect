import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
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
  estadisticasPokemon:any = { "Salud":0, "Ataque":0, "Defensa":0, "A.especial":0, "D.especial":0, "Velocidad":0  };
  chartOptions:any ="";
  nameFigure:string;
  da:string[] = [];
  pokemon:Pokemon = new Pokemon(0,"","","",this.da);

  constructor(private activateRoute:ActivatedRoute, private pokemonService:PokemonService, private http:HttpClient) {
   }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.loadStats();
    this.buscarInformacionPokemon();
  }

  buscarInformacionPokemon(){
    this.pokemonService.getPokemon(this.id).subscribe(data =>{
      let url = "https://pokeapi.co/api/v2/pokemon/"+data.id;
      let name = data.name;
      name = name[0].toUpperCase()+ name.substring(1);
      this.nameFigure = name;

      this.loadTable();

      let image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+data.id+".png";
      this.pokemon = new Pokemon(data.id,name, url,image, data.types);
      this.pokemonService.getPokemonDescription(data.id).subscribe(
        data =>{
          console.log(data.flavor_text_entries.length)
          for (let j = 0; j < data.flavor_text_entries.length; j++) {
            if(data.flavor_text_entries[j].language.name == 'es'){
              this.pokemon.description =data.flavor_text_entries[j].flavor_text;
              break;
            }
          }
        }
      );
      if(this.pokemon.description.length == 0){
        this.pokemon.description = "Descripción no disponible";
      }
    });
   
  }

  loadStats(){
   this.pokemonService.getPokemon(this.id).subscribe(data =>{
      this.estadisticasPokemon['Salud'] = data.stats[0].base_stat;
      this.estadisticasPokemon['Ataque'] = data.stats[1].base_stat;
      this.estadisticasPokemon['Defensa'] = data.stats[2].base_stat;
      this.estadisticasPokemon['A.especial'] = data.stats[3].base_stat;
      this.estadisticasPokemon['D.especial'] = data.stats[4].base_stat;
      this.estadisticasPokemon['Velocidad'] = data.stats[5].base_stat;
   });
  }

  changeToNormal(){
    this.nameFigure = this.pokemon.name;
    fetch('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+this.pokemon.id+'.png')
      .then(response => {
          if(response.status == 200){
            this.pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+this.pokemon.id+".png";
          }else{
            this.pokemon.image = "../../assets/imagen-no-disponible.png";
          }
      });
  }

  changeToShiny(){
    this.nameFigure = this.pokemon.name +" Shiny";
    fetch('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+this.pokemon.id+'.png')
      .then(response => {
          if(response.status == 200){
            this.pokemon.image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/"+this.pokemon.id+".png";
          }else{
            this.pokemon.image = "../../assets/imagen-no-disponible.png";
          }
      });
    
  }

  loadTable(){
    this.chartOptions = {
      title:{
        text: "Estadisticas de "+this.nameFigure 
      },
      animationEnabled: true,
      data: [{        
        type: "column",
        dataPoints: [
          { label: "Salud", y: this.estadisticasPokemon['Salud'], color: '#8CC152' },
          { label: "Ataque", y: this.estadisticasPokemon['Ataque'], color: 'red' },
          { label: "Defensa", y: this.estadisticasPokemon['Defensa'], color: 'yellow' },
          { label: "A.especial", y: this.estadisticasPokemon['A.especial'] },
          { label: "D.especial", y: this.estadisticasPokemon['D.especial'] },
          { label: "Velocidad", y: this.estadisticasPokemon['Velocidad'] }
        ]
      }]
    }	
  }
  
}
