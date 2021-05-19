import { User } from './../../modele/user.modele';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MethodeService } from 'src/app/services/methode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  @Input() list: User;
  conf='false';
  constructor(private apiService: MethodeService,private methodeService: MethodeService,  private router: Router) { }

  ngOnInit(): void {
      //console.log(this.list);
      this.onConfirm();
      
  }
  onConfirm(){
    //alert("dfhgjkjl")
    this.conf='true';
    //console.log("test");
  }
  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("id", user.id.toString());
    //console.log(user.id.toString());
    this.router.navigate(['/admin/users/editUser']);
  }
  deleteUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("id", user.id.toString());
   // console.log(user.id.toString());
    this.apiService.deleteUserId(user.id.toString())
      .subscribe( data => {
        //console.log("succes");
        this.router.navigate(['/admin/home']);
      }); 
  }
}
