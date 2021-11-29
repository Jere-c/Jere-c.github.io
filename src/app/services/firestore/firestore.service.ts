import { Injectable } from '@angular/core';
import { AngularFireModule, } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';


//importamos las librerias para observables
import {map} from 'rxjs/operators';
import { Observable, observable, pipe } from 'rxjs';

//interfaces del producto
export interface IdProduct extends product{
  id:string;
}

export interface product{
  name?:string,
  price?:number,
  img?:string,
  description?:string,
  starred?: boolean,
}

//interfaces de preguntas

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  ref : AngularFirestoreCollection<product>;

  refStorage: AngularFireStorageReference;

  productCollection:Observable<IdProduct[]>

  constructor(
    private fst:AngularFirestore,
    private fsts:AngularFireStorage) {
    this.refStorage = this.fsts.ref('images-products')
    this.ref = this.fst.collection<IdProduct>('product')
    this.productCollection = this.ref.snapshotChanges().pipe(
      map(a => a.map(a =>{
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as product;
        return {id, ...data} 
      }))
    )
  }
//Crea un producto
  createProduct(product:product): Promise<any>{
    return this.ref.add(product);
  }
//actualiza un producto por id
  updateProduct(id:string, data:product){
    return this.ref.doc(id).update(data);
  }
//elimina un producto por id
  deleteProduct(id:string){
    return this.ref.doc(id).delete();
  }
//Obtiene la coleccion de productos
  getProducts(){
    return this.productCollection;
  }
//muestra unicamente los favoritos.
  getCarouselProducts(){
    return this.fst.collection('product', ref => ref.where('starred', '==', true)).snapshotChanges().pipe(
      map(a => a.map(a =>{
      const id = a.payload.doc.id;
      const data = a.payload.doc.data() as product;
      return {id, ...data} 
    }))
    )
  }
  //Obtiene un producto por id
  getProduct(id: string){
    return this.ref.doc(id).snapshotChanges().pipe(
      map(a=>{
        const id = a.payload.id;
        const data = a.payload.data() as product;
        return {id, ...data}
      })
    )
  }

  uploadImage(name:string, data:any){
    return this.fsts.upload(`images-products/${name}`,data)
  }

  returnRef(name:string){
    return this.refStorage.child(name)
  }
}