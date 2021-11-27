import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  user!:any;

  constructor(
    private router:Router,
    private auth:AuthService,
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
    })
  }

  ngOnInit(): void {
  }

  logOut(){
    this.auth.logOut()
  }
}
