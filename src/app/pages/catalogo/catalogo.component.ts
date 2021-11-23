import { Component, OnInit } from '@angular/core';
import { FirestoreService, IdProducto, producto } from '../../services/firestore/firestore.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  producto!:IdProducto;

  products!: any[];

  declare $:any;
  
  formulario:FormGroup;

  constructor(private fb:FormBuilder, private $db:FirestoreService) { 

    this.$db.getProductos().subscribe(( resp =>{
      this.products = resp;
    }))
  

  this.formulario = this.fb.group({
    name:[''],
    price:[''],
    image:[''],
  })
}

  ngOnInit(): void {
    document.querySelector('.dou')?.classList.add('dount')
  }

  mc(id:string){  

    this.$db.getproducto(id).subscribe(x =>{
      this.producto=x;
    })
    console.log(this.producto)
  }

  aceptar(){
    const producto:producto = {
      name:this.formulario.value.name,
      price:this.formulario.value.price,
      img:this.formulario.value.image,
      } 
      this.$db.createProducto(producto)
  }

  delete(id:string){
    this.$db.deleteProducto(id);
  }
  

}
