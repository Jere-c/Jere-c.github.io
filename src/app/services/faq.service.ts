import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IdQuestion extends question{
  id:string;
}
export interface question{
  title:string,
  description:string,
}


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  ref : AngularFirestoreCollection<question>;

  questionCollection : Observable <IdQuestion[]>;

  constructor(private firestore: AngularFirestore) {
    this.ref = firestore.collection<IdQuestion>("questions");
    this.questionCollection = this.ref.snapshotChanges().pipe(
      map(a => a.map(a=>{
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as question;
        return {id, ...data}
      }))
    )
  }

  createQuestion(question:question): Promise<any>{
    return this.ref.add(question)
  }

  updateQuestion(id:string, data:question){
    return this.ref.doc(id).update(data);
  }
  
  deleteQuestion(id:string){
    return this.ref.doc(id).delete();
  }

  getQuestions(): Observable<any> {
    return this.questionCollection;
  }

  getQuestion(id:string){
    return this.ref.doc(id).snapshotChanges().pipe(
      map(a=>{
        const id = a.payload.id;
        const data = a.payload.data() as question;
        return {id, ...data}
      })
    )
  }
  
  editQuestion(){

  }
}
