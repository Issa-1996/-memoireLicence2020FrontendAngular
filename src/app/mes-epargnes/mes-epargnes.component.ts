import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { MethodeService } from './../services/methode.service';
import { Profil } from './../modele/profil.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mes-epargnes',
  templateUrl: './mes-epargnes.component.html',
  styleUrls: ['./mes-epargnes.component.css']
})
export class MesEpargnesComponent implements OnInit {

  listEpargnes: any;
  tours:any;
  listTontine: any;
  pageCurrent=1;
  nomTour:any;
  public totalPage=1;
  tontine:any;
  tour:any;
  ListTourTontines:any;
  ListEpargneTour:any;
  erroTontine='';
  errorTour='';
  errorMontant='';
  errorUser='';
  userTontines:any;
  constructor(private authService:AuthService, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    this.epargne(this.pageCurrent);
    this.Tontine(this.pageCurrent);
  }
  epargne(page:any){
    this.pageCurrent=page;
    this.apiService.readEpargnes(this.pageCurrent)
    .subscribe(
      data => {
        //console.log(data["hydra:member"]);
        
        let totalPage=data;
        totalPage=totalPage['hydra:view']['hydra:last'];
        if(totalPage){
          // @ts-ignore
          totalPage=totalPage[totalPage.length-1];
          // @ts-ignore
          this.totalPage=totalPage;

        }
        this.listEpargnes = data;
        this.listEpargnes = this.listEpargnes["hydra:member"];
        //console.log(this.listEpargnes);
        
        for (let i = 0; i < this.listEpargnes.length; i++) {
          const element = this.listEpargnes[i];   
          this.nomTour=element["nom"];
          //console.log(element["nom"]);    

        }
        //this.listEpargnes = this.listEpargnes["hydra:member"];
        //console.log(this.listEpargnes);
      }
      )
  }         

  Tontine(page:any) {
    this.pageCurrent=page;
    return this.apiService.readTontine(this.pageCurrent)
        .subscribe(
          data => {
            let totalPage=data;
            totalPage=totalPage['hydra:view'];
            if(totalPage){
              // @ts-ignore
              totalPage=totalPage[totalPage.length-1];
              // @ts-ignore
              this.totalPage=totalPage;
            }
            this.listTontine = data;
            //this.listTontine = this.listTontine["hydra:member"];
            for (let i = 0; i < this.listTontine.length; i++) {
              const element = this.listTontine[i];   
              //console.log(element["users"]);      
            }
          },
          error => {
            console.log(error);
          });
    }

    onTontine(comp){
      console.log(comp);
      this.pageCurrent=comp;
      return this.apiService.readOneTontine(this.pageCurrent)
          .subscribe(
            data => {
             // console.log(data);
              
              this.ListTourTontines = data['tour'];
              //this.userTontines=data["users"];
              //console.log(this.userTontines);
            });  
    }

    onTour(comp) {
      console.log(comp);
      //console.log(comp);
      this.pageCurrent=comp;
      return this.apiService.readOneTour(this.pageCurrent)
          .subscribe(
            data => {
             //console.log(data);
              
              this.ListEpargneTour = data["epargnes"];
              console.log(this.ListEpargneTour);
              
              //this.userTontines=data["users"];
              //console.log(this.userTontines);
            }); 
    }
    
}