import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { about, AboutService, IdAbout } from 'src/app/services/about.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  loading!: boolean;

  abouts!: IdAbout[];

  about!: about[];

  user!: any;

  IdAbout!: string;

  editAbout: FormGroup;

  constructor(
    private fb: FormBuilder,
    private $aboutservice: AboutService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.auth.logState().subscribe(resp => {
      this.user = resp;
    })
    this.editAbout = this.fb.group({
      title: [''],
      description: [''],
    })
    this.$aboutservice.getAbouts().subscribe(data => {
      this.abouts = data;
    })
  }
// Abre el modal y obtiene la id.
  openEditAbout(id: string){
    this.IdAbout = id;
    this.$aboutservice.getAbout(id).subscribe(data=> {
      this.editAbout.patchValue({
        title:data.title,
        description: data.description
      })
    })
  }
// Actualiza la carta del about por id.
  update(id:string){
    this.IdAbout = id
    this.loading = true;
    const about: about = {
      title: this.editAbout.value.title,
      description: this.editAbout.value.description,
    }
    this.$aboutservice.updateAbout(this.IdAbout, about).then(()=>{
      this.toastr.success("Sobre nosotros se editó con exito","¡Sobre nosotros editado exitosamente!")
    })
    this.loading = false;
  }
//patchea los valores del about. 
  ngOnInit(): void {
    this.IdAbout = 'jOBaxTwkF2BRBHuLLRWg'
    this.$aboutservice.getAbout(this.IdAbout).subscribe(contact =>{
      this.editAbout.patchValue({
        title: contact.title,
        description: contact.description
      })
    })
  }

}
