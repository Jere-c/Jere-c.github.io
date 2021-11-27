import { Component, OnInit } from '@angular/core';
import { FirestoreService, IdProduct, product} from '../../services/firestore/firestore.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  user!:any;

  choclo!:string;

  starproduct!:any;

  state: boolean = false;

  loading = false;

  idProduct!: string;
  
  ulr: string = "../../../assets/ND.jpg";

  products!: IdProduct[];

  product!: IdProduct[];

  formProduct: FormGroup;

  editProduct: FormGroup;

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private $productservice: FirestoreService,
    private auth: AuthService
    ) {
    this.auth.logState().subscribe(resp => {
      this.user = resp;
    })
    this.formProduct = this.fb.group({
      name: [''],
      price: ['0000000000'],
      img: ['../../../assets/ND.jpg'],
      description: [''],
      starred:['']
    })
    this.editProduct = this.fb.group({
      name: [''],
      price: [''],
      img: [''],
      description: [''],
      starred:['']
    })
    this.$productservice.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  addProduct() {
    const product: product = {
      name: this.formProduct.value.name,
      price: this.formProduct.value.price,
      img: this.ulr,
      description: this.formProduct.value.description,
      starred: false
    }
    this.loading = true;
    this.$productservice.createProduct(product).then(() => {
      this.toastr.success("¡Producto agregado exitosamente!")
      this.loading = false;
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  starProduct(id: string, state:boolean){
    if (!state){
      let product : product = {
        starred:true
      };
      this.$productservice.updateProduct(id, product)
    } else{
      let product : product = {
        starred:false
      };
      this.$productservice.updateProduct(id, product)
    }
  }

  

  //Obtenemos la id del producto selecionado
  openProductEdit(id: string) {
    this.idProduct = id;
    this.$productservice.getProduct(id).subscribe(data =>
      this.editProduct.patchValue({
        name: data.name,
        price: data.price,
        img: data.img,
        description: data.description,
        starred: data.price
      }))
  }
  

  delete(id:string){
    this.$productservice.deleteProduct(id);
  }

  update(){
    const product:product ={
      name: this.editProduct.value.name,
      price: this.editProduct.value.price,
      img: this.ulr,
      description: this.editProduct.value.description,
      starred: this.editProduct.value.starred
    }
    this.$productservice.updateProduct(this.idProduct, product)
  }

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
  }
  ngOnInit(): void {
    document.querySelector('.dou')?.classList.add('dount')
  }



}
