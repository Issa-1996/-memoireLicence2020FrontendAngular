import { Profil } from './../modele/profil.model';
import { User } from './../modele/user.modele';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tontine } from '../modele/tontine.model';
import { Epargne } from '../modele/epargne.model';
import { Tour } from '../modele/tour.model';

@Injectable({
  providedIn: 'root'
})
export class MethodeService {

  headers=new HttpHeaders({Accept:'*/*'})
  baseUrlUser="https://127.0.0.1:8000/api/admin/users";
  
  constructor(private httpClient: HttpClient) { }

  /**
   * Methode pour lister les Utilisateurs
   */
  readAllUsers(page: any): Observable<User[]> {
    return this.httpClient.get<User[]>('https://127.0.0.1:8000/api/admin/users?_page='+page, {headers: {'Content-Type': 'application/json'}});
  }
  addUser(user: any): Observable<User> {
    return this.httpClient.post<User>(this.baseUrlUser, user, {headers:this.headers});
  }
  updateUser(userFormData: any): Observable<User> {
    return this.httpClient.post<User>('https://127.0.0.1:8000/api/admin/users'+'/' +  userFormData.get('id'), userFormData, {headers:this.headers});
  }
  deleteUserId(userFormData: any): Observable<User> {
    return this.httpClient.delete<User>('https://127.0.0.1:8000/api/admin/users'+'/' +  userFormData, {headers:this.headers});
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>('https://127.0.0.1:8000/api/admin/users/' + id);
  }

/**
 * Route profil
 */
 readAllProfil(page: any): Observable<Profil[]> {
  return this.httpClient.get<Profil[]>('https://127.0.0.1:8000/api/admin/profils?_page='+page, {headers: {'Content-Type': 'application/json'}});
}
addProfil(profil: any): Observable<Profil> {
  return this.httpClient.post<Profil>('https://127.0.0.1:8000/api/admin/profils', profil, {headers:this.headers});
}

updateProfil(profil: any): Observable<Profil> {
  return this.httpClient.put<Profil>('https://127.0.0.1:8000/api/admin/profils'+'/' + profil.id, profil, {headers:this.headers});
}
getProfilById(id: number): Observable<Profil> {
  return this.httpClient.get<Profil>('https://127.0.0.1:8000/api/admin/profils/' + id);
}

/**
 * 
 * @param page Route lister Tontine
 * @returns 
 */
readTontine(page: any): Observable<Tontine[]> {
  return this.httpClient.get<Tontine[]>('https://127.0.0.1:8000/api/admin/tontines?_page='+page, {headers: {'Content-Type': 'application/json'}});
}
readOneTontine(id: number): Observable<Tontine[]> {
  return this.httpClient.get<Tontine[]>('https://127.0.0.1:8000/api/admin/tontines/'+id, {headers: {'Content-Type': 'application/json'}});
}
addTontine(profil: any): Observable<Tontine> {
  return this.httpClient.post<Tontine>('https://127.0.0.1:8000/api/admin/tontine', profil, {headers:this.headers});
}
/**
 * 
 * @param tour Tour
 * @returns 
 */
 readOneTour(id: number): Observable<Tour[]> {
  return this.httpClient.get<Tour[]>('https://127.0.0.1:8000/api/admin/tours/'+id, {headers: {'Content-Type': 'application/json'}});
}
addTour(profil: any): Observable<Tour> {
  return this.httpClient.post<Tour>('https://127.0.0.1:8000/api/admin/tours', profil, {headers:this.headers});
}
tirage():Observable<User>{
  return this.httpClient.get<User>('https://127.0.0.1:8000/api/admin/tirage', {headers: {'content-Type': 'application/json'}})
}



/**
 * Epargnes
 */
 addEpargnes(epargne: any): Observable<Epargne> {
  return this.httpClient.post<Epargne>('https://127.0.0.1:8000/api/admin/epargnes', epargne, {headers:this.headers});
}
readEpargnes(page: any): Observable<Epargne[]> {
  return this.httpClient.get<Epargne[]>('https://127.0.0.1:8000/api/admin/tontines/1/tours?_page='+page, {headers: {'Content-Type': 'application/json'}});
}
}
