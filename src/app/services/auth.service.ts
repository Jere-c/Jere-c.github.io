import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: Observable<any>
  constructor(
    private auth: AngularFireAuth,
    private toastr: ToastrService
  ) {
    this.user = auth.authState;
  }

  logIn(username: string, password: string) {
    return this.auth.signInWithEmailAndPassword(username, password);
  }


  logOut(){
    return this.auth.signOut().then(() => {
      this.toastr.error("Cerraste sesión con exito","¡Hasta luego!", {positionClass: 'toast-top-center', closeButton: true });
    });
  }

  logState(){
    return this.user;
  }
}


