import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  helper = new JwtHelperService();
  erreur="";
  erreurEmail="";
  erreurPassword="";
  addForm: FormGroup;
  hide = true;
  sending = false;
  btnText = "Connexion";
  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.addForm.get('login').valueChanges.subscribe(
      () => { this.erreurEmail = ''; this.erreur = ''; }
    );
    this.addForm.get('password').valueChanges.subscribe(
      () => { this.erreurPassword = ''; this.erreur = ''; }
    );
  }
  /**
   * Connexion de l'utilisateur qui appel la methode isLogin() de auth.service.ts
   */
   onSignIn(): any {
    if (this.addForm.get('login').value.trim() === '') {
      this.erreurEmail = 'Login obligatoire !!!';
      return;
    }
    if (this.addForm.get('password').value.trim() === '') {
      this.erreurPassword = 'Mot de passe obligatoire !!!';

    } else {
      this.sending = true;
      this.btnText = "Patientez..."
      this.authService.isLogin(this.addForm.get('login').value, this.addForm.get('password').value).subscribe(
        (data: any) => {
          localStorage.setItem('token', data.token);
          const decodedToken = this.helper.decodeToken(data.token);
          //console.log(decodedToken.username);
          this.token=data;
            console.log(data);
            this.token=this.token.token;
            localStorage.setItem('token', this.token);
            this.router.navigate(['/home']);
         // const roles: string[] = decodedToken.roles;
          ///if (roles.includes('ROLE_ETUDIANT')) {
           // this.router.navigate(['/liste']);
          //} else if (roles.includes('ROLE_ADMIN')) {
          //  this.router.navigate(['/reservation']);
         // }
        },
        (error) => {
          this.sending = false;
          this.btnText = "Connexion"
          this.erreur = 'Données invalides';
          console.log(error.message);
        }
      );
    }
  }
}
