import { AuthService } from './../services/auth.service';
import { AppPage } from './../../../e2e/src/app.po';
import { Router } from '@angular/router';
import { MethodeService } from './../services/methode.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-epargne',
  templateUrl: './epargne.component.html',
  styleUrls: ['./epargne.component.css']
})
export class EpargneComponent implements OnInit {

  addForm: FormGroup;
  tab= new Array;
  listTontine: any;
  pageCurrent=1;
  public totalPage=1;
  tontine:any;
  tour:any;
  ListTourTontines:any;
  erroTontine='';
  errorTour='';
  errorMontant='';
  errorUser='';
  errorInteret='';
  userTontines:any;

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
  this.Tontine(this.pageCurrent);
      this.addForm = this.formBuilder.group({
        tontine: ['', Validators.required],
        tour: ['', Validators.required],
        user: ['', Validators.required],
        montant: ['', Validators.required],
        interet: ['', Validators.required]
      });
  }
  onSubmit() {    
    if(this.addForm.value.tontine===undefined){
      this.erroTontine="Tontine Obligatoire";
    }else{
      this.erroTontine="";
      if(this.addForm.value.tour===""){
        this.errorTour="Tour obligatoire";
      }else{
        this.errorTour="";
        if(this.addForm.value.user===""){
          this.errorUser="Veiller selectionner un membre";
      }else{
        this.errorUser='';
        if(this.addForm.value.montant===""){
          this.errorMontant="Montant Obligatoire";
        }else{
          this.errorMontant="";
          //console.log(this.addForm.value.interet);
          if(this.addForm.value.interet===""){
            this.errorInteret="Veiller cocher une case";
          }else{
            this.errorInteret="";
            this.apiService.addEpargnes(this.addForm.value)
            .subscribe( data => {
              if(data){
                console.log("succes");
                this.router.navigate(["/home"])
              }
            });   
              }
      }   
      }
      }
    }
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
      //console.log(comp);
      this.pageCurrent=comp;
      return this.apiService.readOneTontine(this.pageCurrent)
          .subscribe(
            data => {
              this.ListTourTontines = data['tour'];
              this.userTontines=data["users"];
              //console.log(this.userTontines);
            });  
    }

    onTour(comp) {
      console.log(comp);
    }



}
