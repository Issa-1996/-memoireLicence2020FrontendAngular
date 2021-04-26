import { EspaceMembreComponent } from './espace-membre/espace-membre.component';
import { TourComponent } from './tour/tour.component';
import { MesEpargnesComponent } from './mes-epargnes/mes-epargnes.component';
import { EpargneComponent } from './epargne/epargne.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { ProfilComponent } from './profil/profil.component';
import { AddMembreComponent } from './users/add-membre/add-membre.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { AddTontineComponent } from './add-tontine/add-tontine.component';

const routes: Routes = [
    { path: '', component: AuthComponent },
    { path: 'home', component: HomeComponent,canActivate: [AuthGuardGuard]
    },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuardGuard], 
    children:[
      {path: 'editUser', component: EditUserComponent, canActivate: [AuthGuardGuard]},
      {path: 'detailUser', component: DetailUserComponent, canActivate: [AuthGuardGuard]},
    ]},
    { path: 'addMembre', component: AddMembreComponent, canActivate: [AuthGuardGuard] },
    { path: 'listUser', component: ListUsersComponent, canActivate: [AuthGuardGuard] },
    { path: 'profil', component: ProfilComponent, canActivate: [AuthGuardGuard], children:[
      { path: 'editProfil', component: EditProfilComponent, canActivate: [AuthGuardGuard] }
    ] },
    { path: 'addProfil', component: AddProfilComponent, canActivate: [AuthGuardGuard] },
    { path: 'epargne', component: EpargneComponent, canActivate: [AuthGuardGuard] },
    { path: 'mesEpargnes', component: MesEpargnesComponent, canActivate: [AuthGuardGuard] },
    { path: 'tour', component: TourComponent, canActivate: [AuthGuardGuard] },
    { path: 'espace', component: EspaceMembreComponent, canActivate: [AuthGuardGuard] },
    { path: 'tontine', component: AddTontineComponent, canActivate: [AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
