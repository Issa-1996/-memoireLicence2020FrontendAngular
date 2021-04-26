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
  constructor(private apiService: MethodeService, private router: Router) { }

  ngOnInit(): void {
    this.readProfils(this.pageCurrent);
  }
  editProfil(profil: Profil): void {
    localStorage.removeItem("editProfilId");
    localStorage.setItem("id", profil.id.toString());
    //console.log(user.id.toString());
    this.router.navigate(['/profil/editProfil']);
  }

  readProfils(page:any) {
    this.pageCurrent=page;
    return this.apiService.readAllProfil(this.pageCurrent)
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
            this.listProfils = data;
            this.listProfils = this.listProfils["hydra:member"];
            //console.log(data);
          },
          error => {
            console.log(error);
          });
    }

}
