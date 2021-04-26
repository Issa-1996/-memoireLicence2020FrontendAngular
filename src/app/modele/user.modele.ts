export class User{
    id!: number;
    nom!: string;
    prenom: string;
    email!:string;
    adresse!: string;
    telephone!:string;
    genre!: string;
    profil!:{
        libelle:string;
    };
    status!: boolean;
    avatar!:string;
}