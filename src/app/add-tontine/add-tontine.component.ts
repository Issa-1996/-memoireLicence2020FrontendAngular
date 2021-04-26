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
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      nom: ['', Validators.required],
      session: ['', Validators.required],
      dateCre: ['', Validators.required],
      datef: ['', Validators.required]
    });
  }

  onSubmit() {    
    if(this.addForm.value.nom===""){
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
  }
}
}
