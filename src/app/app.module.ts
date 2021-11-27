import { Compiler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutComponent } from './pages/about/about.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { LoginaComponent } from './pages/logina/logina.component';

//Formularios Reactivos
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

//Toastr Alertas 
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//storage
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ContactoComponent,
    FaqComponent,
    AboutComponent,
    CatalogoComponent,
    FooterComponent,
    CarouselComponent,
    LoginaComponent
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
