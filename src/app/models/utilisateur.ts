import { Enfant } from "./enfant";

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe?: string;
  admin: boolean;
  enfants?: Enfant[];
}
