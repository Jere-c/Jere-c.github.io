import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logina',
  templateUrl: './logina.component.html',
  styleUrls: ['./logina.component.scss']
})
export class LoginaComponent implements OnInit {

  formAuth:FormGroup;

  constructor(
    private fb:FormBuilder,
    private $authservice: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ){
    this.formAuth = this.fb.group({
      username:[''],
      password:[''],
    })
   }

  ngOnInit(): void {
    document.querySelector('.dou')?.classList.add('dount')
  }

  logIn(){
    this.$authservice.logIn(this.formAuth.value.username,this.formAuth.value.password).then(() => {
      this.router.navigate(['/catalogo']);
      this.toastr.success("Iniciaste sesión correctamente","¡Bienvenido!", {positionClass: 'toast-bottom-left', closeButton: true });
    })
  }
}
