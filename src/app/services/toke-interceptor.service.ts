import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokeInterceptorService {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('token')){
        const token= localStorage.getItem('token');
        //console.log(token);
        
        const newRequest=request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
       return next.handle(newRequest);
    }
   return next.handle(request)
}
}
/**
 * installer la commande: npm install @auth0/angular-jwt --save
 */