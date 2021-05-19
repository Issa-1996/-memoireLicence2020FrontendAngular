import { Profil } from './../modele/profil.model';
import { Router } from '@angular/router';
import { MethodeService } from './../services/methode.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  listProfils: Profil[]=[];
  pageCurrent=1;
  public totalPage=1;
  mdlSampleIsOpen : boolean = false;
  constructor(private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    this.readProfils(this.pageCurrent);
  }
  editProfil(profil: Profil): void {
    localStorage.removeItem("editProfilId");
    localStorage.setItem("id", profil.id.toString());
    console.log(profil.id.toString());
    this.router.navigate(['/admin/profil/editProfil']);
  }
  deleteProfil(profil: Profil): void {
    //console.log("dgfhjkj");
    
    localStorage.removeItem("editProfilId");
    localStorage.setItem("id", profil.id.toString());
    console.log(profil.id.toString());
    this.apiService.deleteProfilId(profil.id.toString())
      .subscribe( data => {
        console.log("succes");
        //this.router.navigate(['/admin/profil']);
      }); 
  }
  openModal(open : boolean) : void {
    this.mdlSampleIsOpen = open;
  }
  readProfils(page:any) {
    return this.apiService.readAllProfil()
        .subscribe(
          data => {
            this.listProfils = data;
            this.listProfils = this.listProfils["hydra:member"];
            //console.log(data);
          },
          error => {
            console.log(error);
          });
    }

}
