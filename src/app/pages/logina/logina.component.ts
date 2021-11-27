import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.$authservice.logIn(this.formAuth.value.username,this.formAuth.value.password)
    console.log('nashe')
  }
}
