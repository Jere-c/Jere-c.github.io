import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IdAbout extends about{
  id:string;
}
export interface about{
  title: string,
  description: string,
}


@Injectable({
  providedIn: 'root'
})
export class AboutService {

  ref: AngularFirestoreCollection<about>;

  aboutCollection : Observable <IdAbout[]>;

  constructor(
    private fts: AngularFirestore
  ) { 
    this.ref = fts.collection<IdAbout>('abouts');
    this.aboutCollection = this.ref.snapshotChanges().pipe(
      map(a => a.map(a=>{
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as about;
        return {id, ...data}
      }))
    )
  }
//Actualiza el about por id
  updateAbout(id:string, data:about){
    return this.ref.doc(id).update(data)
  }
//Obtiene la coleccion de tarjetas
  getAbouts(): Observable<any>{
    return this.aboutCollection;
  }
//Obtiene la tarjeta por id
  getAbout(id:string){
    return this.ref.doc(id).snapshotChanges().pipe(
      map(a=>{
        const id = a.payload.id;
        const data = a.payload.data() as about;
        return {id, ...data}
      })
    )
  }
}
