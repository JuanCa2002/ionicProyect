import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss'],
})
export class PruebaComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
   
  }

  buscarPokemon(termino:String){
     this.route.navigate(['/buscar',termino]);
  }
  

}
