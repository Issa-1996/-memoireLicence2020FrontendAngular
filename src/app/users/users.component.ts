import { Router } from '@angular/router';
import { MethodeService } from './../services/methode.service';
import { User } from './../modele/user.modele';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

 
  listUsers: User[]=[];
  pageCurrent=1;
  public totalPage=1;

  constructor(private methodeService: MethodeService,  private router: Router) { }

  ngOnInit(): void {
    this.readUsers(this.pageCurrent);
  }
  

  readUsers(page:any) {
    //console.log("enter");
    
    this.pageCurrent=page;
    return this.methodeService.readAllUsers(this.pageCurrent)
        .subscribe(
          data => {
            console.log(data);
            
            let totalPage=data;
            console.log(data);
            
            totalPage=totalPage['hydra:view']['hydra:last'];
            if(totalPage){
              // @ts-ignore
              totalPage=totalPage[totalPage.length-1];
              // @ts-ignore
              this.totalPage=totalPage;
            }
            this.listUsers = data;
            this.listUsers = this.listUsers["hydra:member"];
            //console.log(data);
          },
          error => {
            console.log(error);
          });
    }
}
