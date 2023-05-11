import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscadorPokemonComponent } from './buscador-pokemon/buscador-pokemon.component';
import { DetallesPokemonComponent } from './detalles-pokemon/detalles-pokemon.component';
import { PruebaComponent } from './navbar/prueba.component';
import * as CanvasJSAngularChart from '../assets/canvasjs-3.7.5/canvasjs.angular.component';
import { FormsModule } from '@angular/forms';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [AppComponent,
  PruebaComponent, BuscadorPokemonComponent, DetallesPokemonComponent,CanvasJSChart],
  imports: [BrowserModule, NgChartsModule, IonicModule.forRoot(), AppRoutingModule,
  HttpClientModule,FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
