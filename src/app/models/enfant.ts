import { Restriction } from "./restriction";

export interface Enfant {
  id?: number;
  prenom: string;
  id_utilisateur: number;
  date_naissance: Date;
  restrictions : Restriction[]
}
