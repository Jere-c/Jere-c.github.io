import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CarouselimagenesService, IdImg, img } from 'src/app/services/carouselimagenes.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  user: any;

  state: boolean = false;

  loading = false;

  IdImg!:string;

  img!: IdImg[];

  imgs!: IdImg[];

  ulr: string = "../../../assets/ND.jpg";

  formCarousel!: FormGroup;
  editCarousel!: FormGroup;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private $carouseliservice:CarouselimagenesService,
    private toastr: ToastrService,
    private $productservice:FirestoreService ){

    {
      this.auth.logState().subscribe(resp => {
        this.user = resp;
      })
      this.formCarousel = this.fb.group({
        img: ['']
      })
      this.editCarousel = this.fb.group({
        img: ['']
      })
      this.$carouseliservice.getImgs().subscribe(data => {
        this.imgs = data
      })
    }
  }
//Metodo para eliminar la imagen del carousel.
  delete(id:string){
    return this.$carouseliservice.deleteImg(id)
  }
//Abre el modal y obtiene la id de la imagen.
  openEdit(id: string) {
    this.IdImg = id;
    this.$carouseliservice.getImg(id).subscribe(data=>
      this.editCarousel.patchValue({
        img: data.img
      }))
  }
//Agrega la imagen a la base de datos.
  addImg(){
    const img:img = {
      img : this.ulr,
    }
    console.log(img)
    this.loading = true;
    this.$carouseliservice.createImg(img).then(() => {
      this.toastr.success("¡Imagen agregada exitosamente!")
      this.loading = false;
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }
//Selecciona la imagen para subirla.
  async selectImage(event: any){
    this.state = true;
    const fileP = event.target.files[0]
    let imageNP = fileP.name
    let editedName = imageNP.replace(' ','+')
    this.$productservice.returnRef(editedName)
    await this.$productservice.uploadImage(editedName, fileP)
    await this.$productservice.returnRef(editedName).getDownloadURL().toPromise().then((donwloadURL:any)=>{
      this.ulr = donwloadURL
    })
    this.state = false
    console.log(this.ulr)
  }

  ngOnInit(): void {
  }

}
