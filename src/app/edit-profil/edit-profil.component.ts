import { Router } from '@angular/router';
import { MethodeService } from './../services/methode.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    let profilId = window.localStorage.getItem("id");
    if(!profilId) {
      alert("Invalid action.")
      this.router.navigate(['/home']);
      return;
    }
    this.addForm = this.formBuilder.group({
      id: [''],
      libelle: ['', Validators.required]
    })
    this.apiService.getProfilById(+profilId)
    .subscribe( data => {
      //sconsole.log(data);
      this.addForm.patchValue(data);
    });
  }


  onSubmit(){
    //console.log(this.addForm.value);
    this.apiService.updateProfil(this.addForm.value)
    .subscribe( data => {
      console.log("success");
      this.router.navigate(['/profil']);
    });    
  }

}
