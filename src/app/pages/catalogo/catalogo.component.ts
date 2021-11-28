import { Component, OnInit } from '@angular/core';
import { FirestoreService, IdProduct, product} from '../../services/firestore/firestore.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { img } from 'src/app/services/carouselimagenes.service';
import { async } from '@firebase/util';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

  user!:any;

  activeModal!:boolean;

  selectedProduct: any;

  starproduct!:any;

  state: boolean = false;

  selectProductImg!: string;

  loading = false;

  idProduct!: string;
  
  ulr: string = "../../../assets/ND.jpg";

  url!: string;

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

  async addProduct() {
    const product: product = {
      name: this.formProduct.value.name,
      price: this.formProduct.value.price,
      img: this.ulr,
      description: this.formProduct.value.description,
      starred: false
    }
    this.loading = true;
    await this.$productservice.createProduct(product).then(() => {
      window.location.reload()
      this.toastr.success("¡Producto agregado exitosamente!")
      this.loading = false;
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
    this.formProduct.patchValue({
      name: [''],
      price: [''],
      img: [''],
      description: ['']
    })
  }

  starProduct(id: string, state:boolean){
    if (!state){
      let product : product = {
        starred:true
      };
      this.$productservice.updateProduct(id, product).then(() => {
        this.toastr.success("El producto fue agregado a destacados correctamente","¡Producto destacado!");
      })
    } else{
      let product : product = {
        starred:false
      };
      this.$productservice.updateProduct(id, product).then(() => {
        this.toastr.error("El producto fue eliminado de destacados correctamente","¡Producto eliminado de destacados!");
      })
    }
  }

  

  //Obtenemos la id del producto selecionado
  openProductEdit(id: string) {
    this.idProduct = id;
    this.$productservice.getProduct(id).subscribe(product => {
      this.editProduct.patchValue({
        name: product.name,
        price: product.price,
        description: product.description,
        starred: product.price
      })
      if (product.img){
        this.selectProductImg = product.img;
      }
    })
  }
  
  selectProduct(product:product){
    this.activeModal = true;
    this.selectedProduct = product;
  }

  delete(id:string){
    this.$productservice.deleteProduct(id).then(() => {
      this.toastr.error("El producto fue eliminado correctamente","¡Producto eliminado!");
    })
  }

async update(){
    if(this.url){
      const product:product ={
        name: this.editProduct.value.name,
        price: this.editProduct.value.price,
        img: this.url,
        description: this.editProduct.value.description,
        starred: this.editProduct.value.starred
      }
      await this.$productservice.updateProduct(this.idProduct, product).then(asd=>{
        window.location.reload()}
      )
    } else{
      const product:product ={
        name: this.editProduct.value.name,
        price: this.editProduct.value.price,
        img: this.selectProductImg,
        description: this.editProduct.value.description,
        starred: this.editProduct.value.starred
      }
      this.$productservice.updateProduct(this.idProduct, product)
    }
    this.editProduct.patchValue({
      name: [''],
      price: [''],
      img: [''],
      description: ['']
    })
  }

  async selectImage(event: any){
    this.state = true;
    const fileP = event.target.files[0]
    let imageNP = fileP.name
    let editedName = imageNP.replace(' ','+')
    this.$productservice.returnRef(editedName)
    await this.$productservice.uploadImage(editedName, fileP)
    await this.$productservice.returnRef(editedName).getDownloadURL().toPromise().then((donwloadURL:any)=>{
      this.ulr = donwloadURL;
      this.url = donwloadURL;
    })
    this.state = false
  }
  ngOnInit(): void {
    document.querySelector('.dou')?.classList.add('dount')
  }



}
