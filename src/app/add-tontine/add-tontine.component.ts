import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodeService } from '../services/methode.service';

@Component({
  selector: 'app-add-tontine',
  templateUrl: './add-tontine.component.html',
  styleUrls: ['./add-tontine.component.css']
})
export class AddTontineComponent implements OnInit {

  addForm: FormGroup;
  errorNom="";
  errorSession="";
  errordate1="";
  errordate2="";
  success="false";
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      session: ['', Validators.required],
      dateCre: ['', Validators.required],
      datef: ['', Validators.required]
    });
    this.addForm.get('nom').valueChanges.subscribe(
      () => { this.errorNom = ''; }
    );
    this.addForm.get('session').valueChanges.subscribe(
      () => { this.errorSession = ''; }
    );
    this.addForm.get('dateCre').valueChanges.subscribe(
      () => { this.errordate1 = '';  }
    );
    this.addForm.get('datef').valueChanges.subscribe(
      () => { this.errordate2 = ''; }
    );
  }

  onSubmit() {    

    if (this.addForm.get('nom').value.trim() === ''){
      this.errorNom = 'Nom de la tontine obligatoire !';
    }
    if (this.addForm.get('session').value.trim() === ''){
      this.errorSession = 'La nom de la session obligatoire !';
    }
    if (this.addForm.get('dateCre').value.trim() === ''){
      this.errordate1 = 'La date de debut obligatoire !';
    }
    if (this.addForm.get('datef').value.trim() === ''){
      this.errordate2 = 'Date de fin obligatoire !';
    }
    if (this.addForm.invalid){
      return;
    }
    this.apiService.addTontine(this.addForm.value)
      .subscribe( data => {
        if(data){
          this.success="true";
          this.addForm.reset();
          //console.log("suuves");
          //this.router.navigate(["/admin/home"])
        }
      });  


   /* if(this.addForm.value.nom===""){
      this.errorNom="Nom de la Tontine Obligatoire";
    }else{
      this.errorNom="";
      if(this.addForm.value.session===""){
        this.errorSession="session obligatoire";
      }else{
        this.errorSession="";
        if(this.addForm.value.dateCre===""){
          this.errordate1="Date debut un membre";
      }else{
        this.errordate1='';
        if(this.addForm.value.datef===""){
          this.errordate2="date fin Obligatoire";
        }else{
          this.errordate2="";
          //console.log(this.addForm.value.interet);
            this.apiService.addTontine(this.addForm.value)
            .subscribe( data => {
              if(data){
                console.log(data);
                this.router.navigate(["/home"])
              }
            });   
        }
      }
    }
  }*/
}
}
