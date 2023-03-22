import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BuscadorPokemonComponent } from './buscador-pokemon/buscador-pokemon.component';
import { DetallesPokemonComponent } from './detalles-pokemon/detalles-pokemon.component';
import { PruebaComponent } from './navbar/prueba.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path:'buscar/:parametro/:termino',
    component:BuscadorPokemonComponent},
  { path:'prueba',
    component:PruebaComponent},
  { path:'detalles-pokemon/:id/:',
    component:DetallesPokemonComponent},   
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
