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
  success="false";

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
      this.addForm.get('tontine').valueChanges.subscribe(
        () => { this.erroTontine = ''; }
      );
      this.addForm.get('tour').valueChanges.subscribe(
        () => { this.errorTour = ''; }
      );
      this.addForm.get('user').valueChanges.subscribe(
        () => { this.errorUser = ''; }
      );
      this.addForm.get('montant').valueChanges.subscribe(
        () => { this.errorMontant = ''; }
      );
      this.addForm.get('interet').valueChanges.subscribe(
        () => { this.errorInteret = ''; }
      );
  }
  onSubmit() {    
    if (this.addForm.get('tontine').value === ''){
      this.erroTontine = 'Veiller selectionner une Tontine!';
    }
    if (this.addForm.get('tour').value === ''){
      this.errorTour = 'Selectionne une Tour!';
    }
    if (this.addForm.get('user').value === ''){
      this.errorUser = 'selectionner un membre!';
    }
    if (this.addForm.get('montant').value === ''){
      this.errorMontant = 'Montant Obligatoire!';
    }
    if (this.addForm.get('interet').value === ''){
      this.errorInteret = 'interet Obligatoire !!!';
    }
    if (this.addForm.invalid){
      return;
    }
    //console.log("ghbjnk");
    
    this.apiService.addEpargnes(this.addForm.value)
      .subscribe( data => {
        if(data){
          //console.log("succes");
          this.addForm.reset();
          this.success="true";
          //this.router.navigate(["/admin/epargne"])
        }
      });  
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
            //console.log(error);
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
      //console.log(comp);
    }
  }
