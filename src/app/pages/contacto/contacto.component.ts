import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ContactService, IdContact } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  user!: boolean;

  contacts!:IdContact[];

  constructor(
    private $contactservice: ContactService,
    private auth:AuthService  ) { 
    this.auth.logState().subscribe(resp=>{
      this.user = resp;
    })
    this.$contactservice.getContacts().subscribe((resp=>{
      this.contacts = resp
    }))
  }

  ngOnInit(): void {
  }

}
