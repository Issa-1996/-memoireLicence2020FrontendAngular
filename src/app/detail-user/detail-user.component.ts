import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodeService } from '../services/methode.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  addForm: FormGroup;
  avatar: any;
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    let userId = window.localStorage.getItem("id");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['/home']);
      return;
    }
    this.addForm = this.formBuilder.group({
      id: [''],
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      genre: ['', Validators.required],
      profil: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
  })
  this.apiService.getUserById(+userId)
      .subscribe( data => {
        //sconsole.log(data);
        this.addForm.patchValue(data);
      });
  }

  onSubmit(){
    console.log(this.addForm.value);
    const formData=new FormData();
    formData.append('id',this.addForm.value.id)
    formData.append('prenom',this.addForm.value.prenom)
    formData.append('prenom',this.addForm.value.prenom)
    formData.append('nom',this.addForm.value.nom)
    formData.append('email',this.addForm.value.email)
    formData.append('telephone',this.addForm.value.telephone)
    formData.append('adresse',this.addForm.value.adresse)
    formData.append('genre',this.addForm.value.genre)
    formData.append('password',this.addForm.value.password)
    formData.append('role',this.addForm.value.role)
    formData.append('avatar',this.avatar)
    this.apiService.updateUser(formData)
      .subscribe( data => {
        console.log(data);
        this.router.navigate(['/users']);
      });    
  }
  onUploadAvatar=(event:any)=>{
    this.avatar=event.target.files[0]
  }

}
