import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Pokemon } from '../models/pokemon';
import { TablaTipo } from '../models/TablaTipos';
import { PokemonService } from '../services/pokemon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles-pokemon',
  templateUrl: './detalles-pokemon.component.html',
  styleUrls: ['./detalles-pokemon.component.scss'],
})
export class DetallesPokemonComponent implements OnInit {
  id:string ="";
  pokemonBase:Pokemon;
  primerasEvoluciones: Pokemon[] = [];
  segundasEvoluciones: Pokemon[] = [];
  tablaCorrespondiente: any[] = [];
  tablaTipos: TablaTipo = new TablaTipo();
  estadisticasPokemon:any = { "Salud":0, "Ataque":0, "Defensa":0, "A.especial":0, "D.especial":0, "Velocidad":0  };
  chartOptions:any ="";
  nameFigure:string;
  da:string[] = [];
  pokemon:Pokemon = new Pokemon(0,"","","",this.da);

  constructor(private activateRoute:ActivatedRoute, private pokemonService:PokemonService, private http:HttpClient) {
   }

  ngOnInit() {
    this.pokemonBase = this.pokemon;
    this.id = this.activateRoute.snapshot.params['id'];
    this.loadStats();
    this.buscarInformacionPokemon();
    this.showLoading(1000)
    this.cargarEvolucionesPokemon();
    if(this.pokemon.id ==0){
      this.pokemonNotFound(this.id);
    }
  }

  buscarInformacionPokemon(){
    this.pokemonService.getPokemon(this.id).subscribe(data =>{
      let url = "https://pokeapi.co/api/v2/pokemon/"+data.id;
      let name = data.name;
      name = name[0].toUpperCase()+ name.substring(1);
      this.nameFigure = name;

      this.loadTable();

      let image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+data.id+".png";
      this.pokemon = new Pokemon(data.id,name, url,image, data.types,"",data.weight/10, data.height/10);

      for (let i = 0; i < this.pokemon.types.length; i++) {
        this.tablaCorrespondiente.push(this.tablaTipos.tablaTipos[this.pokemon.types[i].type.name]);
      }
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

  showLoading(tiempo:number){
    Swal.fire({
      heightAuto: false,
      title: 'Cargando...',
      showConfirmButton: false,
      timer:tiempo
    }).then();{
      Swal.showLoading()
    };
  }

  cargarEvolucionesPokemon(){
    this.pokemonService.getPokemonDescription(this.id).subscribe(data =>{
      let number =0;
      if(data.evolution_chain.url !=null){
        let match = data.evolution_chain.url.match(/evolution-chain\/(\d+)/);
        if(match){
          number = parseInt(match[1]);
        }
      }
      this.pokemonService.getEvolutionChain(number).subscribe(dataDos =>{
        this.pokemonService.getPokemon(dataDos.chain.species.name).subscribe(dataTres =>{
          let url = "https://pokeapi.co/api/v2/pokemon/"+dataTres.id;
          let name = dataTres.name;
          let image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+dataTres.id+".png";
          let pokemon = new Pokemon(dataTres.id,name, url,image, dataTres.types);
          this.pokemonBase = pokemon;
        });
        this.recorrerCadenaEvolucion(dataDos.chain.evolves_to,"primera")
      });
    });
  }


  recorrerCadenaEvolucion(cadena:any[],tipo:string){
     for (let i = 0; i < cadena.length; i++) {
        this.pokemonService.getPokemon(cadena[i].species.name).subscribe(data =>{
          let url = "https://pokeapi.co/api/v2/pokemon/"+data.id;
          let name = data.name;
          let image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+data.id+".png";
          let pokemon = new Pokemon(data.id,name, url,image, data.types);
          if(tipo == "primera"){
            this.primerasEvoluciones.push(pokemon);
          }else if(tipo == "segunda"){
            this.segundasEvoluciones.push(pokemon);
          }
          if(cadena[i].evolves_to.length!=0){
            this.recorrerCadenaEvolucion(cadena[i].evolves_to,"segunda");
          }
        });
      
     }
  }

  pokemonNotFound(id:string){
    this.pokemonService.getPokemon(id).subscribe(data =>{
          let url = "https://pokeapi.co/api/v2/pokemon/"+data.id;
          let name = data.name;
          let image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"+data.id+".png";
          let pokemon = new Pokemon(data.id,name, url,image, data.types);
          this.pokemonBase = pokemon;
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
          { label: "Ataque especial", y: this.estadisticasPokemon['A.especial'] },
          { label: "Defensa especial", y: this.estadisticasPokemon['D.especial'] },
          { label: "Velocidad", y: this.estadisticasPokemon['Velocidad'] }
        ]
      }]
    }	
  }
  
}
