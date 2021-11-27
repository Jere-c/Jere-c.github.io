import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService, IdProduct } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  user!:any;

  products!:IdProduct[];

  constructor(
    private auth: AuthService,
    private $productservice:FirestoreService
    ){
    this.$productservice.getCarouselProducts().subscribe(data => {
      this.products = data;
    }) 
    this.auth.logState().subscribe(resp => {
      this.user = resp;
    })
  }
  ngOnInit(): void {
  }

}
