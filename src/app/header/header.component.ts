import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any;
  prenom:any;
  nom:any;
  profil:any;
  avatar:any;
  public isProfil="" ;
  public isLoggedIn="false";
  constructor(private accessService: AuthService, private router: Router, private authService:AuthService) { 
  
   }

  ngOnInit(): void {
    this.connectUser();
    if(this.accessService.hasToken()){
      this.isLoggedIn="true";
    }
    else{
      this.isLoggedIn="false";
    }
  }
  /**
   * deconnexion, detruit  le token puis le redirige vers l'authentification
   * appel la methode isLogOut() de auth.service.ts
   */
  deconnecter(){
    localStorage.removeItem('token'); 
    this.accessService.isLogOut();
    this.router.navigate(['/']);
    this.isLoggedIn="false";
  }
  connectUser(){
    this.authService.userConnect()
    .subscribe(data=>{
      this.user=data;
      this.avatar=data["avatar"];
      this.prenom=data["prenom"];
      this.nom=data["nom"];
      //console.log(data);
      
     // this.profil=data["profil"]["libelle"];
      if(data["profil"]["libelle"]==="membre"){
        this.isProfil="true";
      }else{
        this.isProfil="false";
      }
     // console.log(data["profil"]["libelle"]);
    })
  }
}
