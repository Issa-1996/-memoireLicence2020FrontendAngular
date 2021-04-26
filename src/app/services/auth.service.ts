import { User } from './../modele/user.modele';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  httpOptions={
    headers: new HttpHeaders({
      Authorization: 'Bearer'+this.hasToken()
    })
  }


  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }


  /**
   * Stock le token si l'utilisateur est connecter
   * @returns {boolean}
   */
  public hasToken() : boolean {
    return !!localStorage.getItem('token');
  }
  /**
   * Verifie si l'utilisateur est connecter. Et retourn boolean
   */
  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  
  /**
   * Connexion de l'utilisateur et prend en parametre, le login et le password
   * cette methode est appeler dans auth.component.ts
   * @param email 
   * @param password 
   */
  isLogin(email: string, password: string){
   // console.log(password);
    
    const body='{"email":"'+ email +'","password":"'+ password+ '"}';        
    const header=new HttpHeaders({'Content-Type':'application/json'});  
    return this.http.post("https://127.0.0.1:8000/api/login",body,{headers:header});
  }
  /**
   * Deconnexion de l'utilisateur, cette methode est appeler dans auth.component.ts
   */
  
  isLogOut(){
    localStorage.removeItem('token');  
  }
  userConnect():Observable<User[]>{
    return this.http.get<User[]>('https://127.0.0.1:8000/api/admin/currentUser', this.httpOptions);
  }

}
