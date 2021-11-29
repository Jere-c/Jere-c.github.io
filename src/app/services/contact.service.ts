import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IdContact extends contact{
  id:string;
}

export interface contact{
  localname: string;
  address: string;
  facebook: string;
  instagram: string;
  tnumber: string;
}


@Injectable({
  providedIn: 'root'
})


export class ContactService {

  private contactCollection: AngularFirestoreCollection<any>
  contacts: Observable<IdContact[]>

  constructor(
    private fst: AngularFirestore,
  ) {
    this.contactCollection = this.fst.collection<IdContact[]>('contacts');
    this.contacts = this.contactCollection.snapshotChanges().pipe(
      map(a => a.map(a =>{
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as contact;
        return {id, ...data}
      })) 
    )
  }
//Obtiene los contactos
  getContacts(){
    return this.contacts
  }
//obtiene un contacto por id
  getContact(id:string){
    return this.contactCollection.doc(id).snapshotChanges().pipe(
      map(a=> {
        const id = a.payload.id;
        const data = a.payload.data() as contact
        return {id, ...data}
      })
    )
  }
//actualiza un contacto por id
  updateContact(id:string, data: contact){
    return this.contactCollection.doc(id).update(data)
  }
}

