import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { FaqComponent } from './pages/faq/faq.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginaComponent } from './pages/logina/logina.component';

const routes: Routes = [
  {
    path:'inicio', component:InicioComponent
  },
  {
    path:'catalogo', component:CatalogoComponent
  },
  {
    path: 'faq', component:FaqComponent
  },
  {
    path: 'loginadmin', component:LoginaComponent
  },
  {
    path: 'about', component:AboutComponent
  },
  {
    path: '', component:InicioComponent
  },
  {
    path: '**', component:InicioComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
