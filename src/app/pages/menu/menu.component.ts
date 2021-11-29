import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { contact, ContactService, IdContact } from 'src/app/services/contact.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  currentPage: any;

  addProductButton: boolean = false;

  addQuestionButton: boolean = false;

  addImgButton: boolean = false;

  idcontact!:string;

  user!:any;

  editContact!:FormGroup;

  contacts!: IdContact[];

  constructor(
    private router:Router,
    private auth:AuthService,
    private fb:FormBuilder,
    private $contactservice: ContactService,
    private toastr: ToastrService
  ) { 
    this.auth.logState().subscribe(resp=>{
      this.user = resp;
    })
    this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd){
        this.currentPage = event.url;
        console.log(this.currentPage)
        if (this.currentPage == "/catalogo"){
          this.addProductButton = true;
        }
        if (this.currentPage == "/faq"){
          this.addQuestionButton = true;
        }
        if (this.currentPage == "/inicio"){
          this.addImgButton = true;
        }
      }
      this.$contactservice.getContacts().subscribe((resp =>{
        this.contacts = resp
      }))
      this.editContact = this.fb.group({
        localname:[''],
        address:[''],
        facebook:[''],
        instagram:[''],
        tnumber:['']
      })
    })
  }

  update(id:string){
    this.idcontact = id
    const contact: contact = {
      localname: this.editContact.value.localname,
      address: this.editContact.value.address,
      facebook: this.editContact.value.facebook,
      instagram: this.editContact.value.instagram,
      tnumber: this.editContact.value.tnumber,
    }
    this.$contactservice.updateContact(id, contact).then(asd =>{
      this.toastr.success("¡Editado con exito!")
    });
  }

  ngOnInit(): void {
    this.idcontact = 'jOBaxTwkF2BRBHuLLRWg'
    this.$contactservice.getContact(this.idcontact).subscribe(contact =>{
      this.editContact.patchValue({
        localname: contact.localname,
        address: contact.address,
        facebook: contact.facebook,
        instagram: contact.instagram,
        tnumber: contact.tnumber,
      })
    })
  }

  logOut(){
    this.auth.logOut().then(()=>{
      this.router.navigate(['/loginadmin'])
    })
  }


}
