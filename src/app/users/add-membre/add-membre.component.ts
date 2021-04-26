import { Tontine } from './../../modele/tontine.model';
import { User } from './../../modele/user.modele';
import { Router } from '@angular/router';
import { MethodeService } from './../../services/methode.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'app-add-membre',
  templateUrl: './add-membre.component.html',
  styleUrls: ['./add-membre.component.css']
})
export class AddMembreComponent implements OnInit {

  addForm: FormGroup;
  listTontine: any;
  pageCurrent=1;
  public totalPage=1;
  avatar: any;
  public messagePrenom="";
  public messageNom="";
  public messageTelephone="";
  public messageAdresse="";
  public messageGenre="";
  public messageProfil="";
  public messageAvatar="";
  public messageTontine="";
  public messageCni="";
  public messageRoles="";
  public messageEmail="";
  public messagePassword="";
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit() {
    this.Tontine(this.pageCurrent);
    this.addForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      nom: ['', Validators.required],
      telephone: ['', Validators.required],
      cni: ['', Validators.required],
      adresse: ['', Validators.required],
      Genre: ['', Validators.required],
      roles: ['', Validators.required],
      profil: ['', Validators.required],
      avatar: ['', Validators.required],
      tontine: ['', Validators.required]
    });

  }
  onSubmit() {
    if(this.addForm.value.prenom.length<=0){
      this.messagePrenom="Prenom Obligatoire";
    }else{
      this.messagePrenom="";
      if(this.addForm.value.nom.length<=0){
        this.messageNom="Nom obligatoire";
      }else{
        this.messageNom="";
        if(this.addForm.value.telephone.length<=0){
          this.messageTelephone="Telephone Obligatoire";
        }else{
          this.messageTelephone="";
          if(this.addForm.value.adresse.length<=0){
            this.messageAdresse="Adresse obligatoire";
          }else{
            this.messageAdresse="";
            if(this.addForm.value.Genre.length<=0){
              this.messageGenre="Genre Obligatoire";
            }else{
              this.messageGenre="";
              if(this.addForm.value.profil.length<=0){
                this.messageProfil="Profil obligatoire";
              }else{
                this.messageProfil="";
                if(this.addForm.value.avatar.length<=0){
                  this.messageAvatar="Avatar obligatoire";
                }else{
                  this.messageAvatar="";
                  if(this.addForm.value.tontine.length<=0){
                    this.messageTontine="Veiller selectionner une tontine";
                  }else{
                    this.messageTontine="";
                    if(this.addForm.value.cni.length<=0){
                      this.messageCni="cni obligatoire";
                    }else{
                      this.messageCni="";
                      if(this.addForm.value.roles.length<=0){
                        this.messageRoles="roles obligatoire";
                      }else{
                        this.messageRoles="";
                        if(this.addForm.value.email.length<=0){
                          this.messageEmail="Email obligatoire";
                        }else{
                          this.messageEmail="";
                          if(this.addForm.value.password.length<=0){
                            this.messagePassword="mot de pass obligatoire";
                          }else{
                            this.messagePassword="";
                            const formData=new FormData();
                            formData.append('prenom',this.addForm.value.prenom)
                            formData.append('nom',this.addForm.value.nom)
                            formData.append('roles',this.addForm.value.roles)
                            formData.append('email',this.addForm.value.email)
                            formData.append('cni',this.addForm.value.cni)
                            formData.append('telephone',this.addForm.value.telephone)
                            formData.append('adresse',this.addForm.value.adresse)
                            formData.append('Genre',this.addForm.value.Genre)
                            formData.append('password',this.addForm.value.password)
                            formData.append('tontine',this.addForm.value.tontine)
                            formData.append('avatar',this.avatar)
                            formData.append('profil',this.addForm.value.profil)
                            this.apiService.addUser(formData)
                              .subscribe( data => {
                                console.log(data);
                                this.router.navigate(['/users']);
                              });
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    //console.log(this.addForm.value);
  
  }
  onUploadAvatar=(event:any)=>{
    this.avatar=event.target.files[0]
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
              
            }
            //console.log(this.listTontine['0']['nom']);
          },
          error => {
            console.log(error);
          });
    }



}
