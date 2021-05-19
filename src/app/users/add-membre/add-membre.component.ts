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
  listProfils:any;
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
  erreur = '';
  constructor(private formBuilder: FormBuilder, private apiService: MethodeService, private router: Router) { }

  ngOnInit() {
    this.readProfil();
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
    this.addForm.get('prenom').valueChanges.subscribe(
      () => { this.messagePrenom = ''; this.erreur = ''; }
    );
    this.addForm.get('nom').valueChanges.subscribe(
      () => { this.messageNom = ''; this.erreur = ''; }
    );
    this.addForm.get('telephone').valueChanges.subscribe(
      () => { this.messageTelephone = ''; this.erreur = ''; }
    );
    this.addForm.get('adresse').valueChanges.subscribe(
      () => { this.messageAdresse = ''; this.erreur = ''; }
    );
    this.addForm.get('Genre').valueChanges.subscribe(
      () => { this.messageGenre = ''; this.erreur = ''; }
    );
    this.addForm.get('profil').valueChanges.subscribe(
      () => { this.messageProfil = ''; this.erreur = ''; }
    );
    this.addForm.get('avatar').valueChanges.subscribe(
      () => { this.messageAvatar = ''; this.erreur = ''; }
    );
    this.addForm.get('tontine').valueChanges.subscribe(
      () => { this.messageTontine = ''; this.erreur = ''; }
    );
    this.addForm.get('cni').valueChanges.subscribe(
      () => { this.messageCni = ''; this.erreur = ''; }
    );
    this.addForm.get('roles').valueChanges.subscribe(
      () => { this.messageRoles = ''; this.erreur = ''; }
    );
    this.addForm.get('email').valueChanges.subscribe(
      () => { this.messageEmail = ''; this.erreur = ''; }
    );
    this.addForm.get('password').valueChanges.subscribe(
      () => { this.messagePassword = ''; this.erreur = ''; }
    );
  }
  onSubmit() {
    /*if(this.addForm.value.prenom.length<=0){
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
      }*/
      if (this.addForm.get('prenom').value.trim() === ''){
        this.messagePrenom = 'Prenom obligatoire !';
      }
      if (this.addForm.get('nom').value.trim() === ''){
        this.messageNom = 'Nom obligatoire !';
      }
      if (this.addForm.get('telephone').value.trim() === ''){
        this.messageTelephone = 'Numero de telephone obligatoire !';
      }
      if (this.addForm.get('adresse').value.trim() === ''){
        this.messageAdresse = 'Adresse obligatoire !';
      }
      if (this.addForm.get('Genre').invalid){
        this.messageGenre = 'Genre incorrect !';
      }
      if (this.addForm.get('profil').value.trim() === ''){
        this.messageProfil = 'Profil obligatoire !';
      }
      if (this.addForm.get('avatar').value.trim() === ''){
        this.messageAvatar = 'Choisir un avatar !';
      }
      if (this.addForm.get('tontine').value.trim() === ''){
        this.messageTontine = 'Date de naissance obligatoire !';
      }
      if (this.addForm.get('cni').value.trim() === ''){
        this.messageCni = 'CNI obligatoire !';
      }
      if (this.addForm.get('roles').value.trim() === ''){
        this.messageRoles = 'Roles obligatoire !';
      }
      if (this.addForm.get('email').value.trim() === ''){
        this.messageEmail = 'Email obligatoire';
      }
      if (this.addForm.get('password').value.trim() === ''){
        this.messagePassword = 'Mot de passe obligatoire !';
      }
      if (this.addForm.invalid){
        return;
      }
      const data: any=JSON.stringify(this.addForm.value);
      delete data.avatar;
      const formData=new FormData();
      formData.append("user",data);
      formData.append("avatar", this.avatar);
      this.apiService.addUser(formData)
        .subscribe( data => {
          console.log(data);
          this.router.navigate(['/users']);
        });
              //this.subscribe(this.addForm.value);
  }
      //console.log(this.addForm.value);
  
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
    readProfil(){
      return this.apiService.readAllProfil()
        .subscribe(
          data => {
            this.listProfils = data;
            this.listProfils = this.listProfils["hydra:member"];
            console.log(this.listProfils);
          },
          error => {
            console.log(error);
          });
    }
}
