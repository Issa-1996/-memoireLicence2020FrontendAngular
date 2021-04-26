import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public email = '';
  public password = '';
  public token:  any;
  erreur="";
  erreurEmail="";
  erreurPassword="";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  /**
   * Connexion de l'utilisateur qui appel la methode isLogin() de auth.service.ts
   */
  onSignIn(){
   // console.log("srfdghjklkmkljhgf");
   if(this.email==""){
     this.erreurEmail="Email obligatoire";
   }else{
     this.erreurEmail="";
     if(this.password==""){
       this.erreurPassword="Mot de pass obligatoire";
     }else{
       this.erreurPassword="";
       this.authService.isLogin(this.email, this.password).subscribe(
        data=>{
          if(data){
            this.erreur="";
            this.token=data;
            console.log(data);
            this.token=this.token.token;
            localStorage.setItem('token', this.token);
            this.router.navigate(['/home']);
          }else{
            this.erreur="Email ou  Mot de pass incorrect";
          }
        },(error)=>{
          this.erreur="Email ou  Mot de pass incorrect";
        } 
      )
     }
   }
  }
}
