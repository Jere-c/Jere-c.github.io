import { Injectable } from '@angular/core';
import { AngularFireModule, } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


//importamos las librerias para observables
import {map} from 'rxjs/operators';
import { Observable, observable, pipe } from 'rxjs';

export interface IdProducto extends producto{
  id:string;
}

export interface producto{
  name:string,
  price:number,
  img:string,
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  private productCollection : AngularFirestoreCollection<any>;
  productos:Observable<IdProducto[]>

  constructor(private fst:AngularFirestore) {
    this.productCollection = this.fst.collection<IdProducto>('product')
    this.productos = this.productCollection.snapshotChanges().pipe(
      map(a => a.map(a =>{
        const producto: IdProducto = {
          id: a.payload.doc.id,
          name: a.payload.doc.data().name,
          price: a.payload.doc.data().price,
          img: a.payload.doc.data().img,
        }
        return producto
      }))
    )
  }

  createProducto(data:producto){
    return this.productCollection.add(data)
  }

  getProductos(){
    return this.productos
  }

  getproducto(id:string){
    return this.productCollection.doc(id).snapshotChanges().pipe(
      map( a => {
        const data= a.payload.data() as producto;
        const id = a.payload.id;
        return {id,...data}
      })
    )

  }

  updateProducto(id:string, data:producto){
    return this.productCollection.doc(id).update(data)
  }

  deleteProducto(id:string){
    return this.productCollection.doc(id).delete()
  }
}
