import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodeService } from '../services/methode.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  addForm: FormGroup;
  listTontine:any;
  pageCurrent=1;
  public totalPage=1;
  erreurNom="";
  erreurTontine="";
  gagnantPrenom:any;
  gagnantNom:any;
  erreurDate="";
  success="false";
  affice=false;
  cache=true;
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    this.Tontine(this.pageCurrent);
    this.sortant();
      this.addForm = this.formBuilder.group({
        nom: ['', Validators.required],
        date: ['', Validators.required],
        tontine:['', Validators.required]
      });
      this.addForm.get('nom').valueChanges.subscribe(
        () => { this.erreurNom = ''; }
      );
      this.addForm.get('date').valueChanges.subscribe(
        () => { this.erreurDate = ''; }
      );
      this.addForm.get('tontine').valueChanges.subscribe(
        () => { this.erreurTontine = ''; }
      );
  }
  onSubmit() {
    /*console.log(this.addForm.value.nom);
    if(this.addForm.value.nom==""){
      this.erreurNom="Le nom du Tour est obligatoire";
    }else{
      this.erreurNom="";
      if(this.addForm.value.tontine==""){
        this.erreurTontine="Selectionne une tontine";
      }else{
        this.erreurTontine="";
        if(this.addForm.value.date==""){
          this.erreurDate="La date est obligatoire";
        }
        else{
          this.erreurDate="";
          this.apiService.addTour(this.addForm.value)
          .subscribe( data => {
            console.log(data);
            this.router.navigate(['/home']);
          });
        }
      }
    }*/
    if (this.addForm.get('nom').value.trim() === ''){
      this.erreurNom = 'Le nom de la tour obligatoire !';
    }
    if (this.addForm.get('tontine').value.trim() === ''){
      this.erreurTontine = 'Veiller selectionner une tontine !';
    }
    if (this.addForm.get('date').value.trim() === ''){
      this.erreurDate = 'Date du tour obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    this.apiService.addTour(this.addForm.value)
      .subscribe( data => {
        this.success="true";
        this.addForm.reset();
        //console.log("success");
        //this.router.navigate(['/home']);
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
          },
          error => {
            console.log(error);
          });
    }
    sortant(){
     // this.cache=true;
      this.apiService.tirage()
      .subscribe(
        data=>{
          //console.log(data);
          this.gagnantPrenom=" "+data["prenom"];
          this.gagnantNom=data["nom"];
        }
      )
    }
    alert(){
      //alert("fhgjkjlk")
      this.affice=true;
    }
}
