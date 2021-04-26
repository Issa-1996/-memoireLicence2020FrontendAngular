import { ProfilComponent } from './profil/profil.component';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokeInterceptorService } from './services/toke-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { AddMembreComponent } from './users/add-membre/add-membre.component';
import { AddProfilComponent } from './add-profil/add-profil.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { EpargneComponent } from './epargne/epargne.component';
import { MesEpargnesComponent } from './mes-epargnes/mes-epargnes.component';
import { TourComponent } from './tour/tour.component';
import { EspaceMembreComponent } from './espace-membre/espace-membre.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';
import { AddTontineComponent } from './add-tontine/add-tontine.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    UsersComponent,
    ListUsersComponent,
    AddMembreComponent,
    ProfilComponent,
    AddProfilComponent,
    EditProfilComponent,
    EpargneComponent,
    MesEpargnesComponent,
    TourComponent,
    EspaceMembreComponent,
    EditUserComponent,
    DetailUserComponent,
    AddTontineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    TokeInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
