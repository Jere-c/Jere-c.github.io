import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: Observable<any>
  constructor(
    private auth: AngularFireAuth,
  ) {
    this.user = auth.authState;
  }

  logIn(username: string, password: string) {
    return this.auth.signInWithEmailAndPassword(username, password);
  }


  logOut(){
    return this.auth.signOut();
  }

  logState(){
    return this.user;
  }
}


