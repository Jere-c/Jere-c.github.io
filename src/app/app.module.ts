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
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
