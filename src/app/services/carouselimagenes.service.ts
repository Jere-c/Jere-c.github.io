import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export interface IdImg extends img {
  id: string;
}

export interface img {
  img: string;
}

@Injectable({
  providedIn: 'root'
})


export class CarouselimagenesService {
  ref: AngularFirestoreCollection<img>;

  refS: AngularFireStorageReference;

  imgCollection: Observable<IdImg[]>;

  constructor(
    private fst: AngularFirestore,
    private fsts: AngularFireStorage,
  ) {
    this.ref = this.fst.collection<IdImg>('img');
    this.refS = this.fsts.ref('images-products');
    this.imgCollection = this.ref.snapshotChanges().pipe(
      map(a => a.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as img;
        return { id, ...data }
      }))
    )
  }

  createImg(img: img): Promise<any>{
    return this.ref.add(img);
  }

  updateImg(id:string, data:img){
    return this.ref.doc(id).update(data);
  }

  deleteImg(id:string){
    return this.ref.doc(id).delete();
  }

  getImgs(){
    return this.imgCollection;
  }

  uploadImage(name:string, data:any){
    return this.fsts.upload(`images-products/${name}`,data)
  }

  returnRef(name:string){
    return this.refS.child(name)
  }

  getImg(id:string){
    return this.ref.doc(id).snapshotChanges().pipe(
      map(a=>{
        const id = a.payload.id;
        const data = a.payload.data() as img;
        return {id, ...data}
      })
    )
    
  }

}



