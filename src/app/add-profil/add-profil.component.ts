import { Router } from '@angular/router';
import { MethodeService } from './../services/methode.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-profil',
  templateUrl: './add-profil.component.html',
  styleUrls: ['./add-profil.component.css']
})
export class AddProfilComponent implements OnInit {

  addForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
      this.addForm = this.formBuilder.group({
        libelle: ['', Validators.required]
      });
  }
  onSubmit() {
    //console.log(this.addForm.value);
    this.apiService.addProfil(this.addForm.value)
      .subscribe( data => {
        console.log(data);
        //this.router.navigate(['/home/listUser']);
      });
  }



}
