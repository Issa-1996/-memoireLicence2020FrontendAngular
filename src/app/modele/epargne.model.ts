import { Tour } from './tour.model';
export class Epargne{
    id:number;
    montant:string;
    interet:string;
    dateEpargne:Date
    tour:{
        id:number;
        nom:string;
    }
}