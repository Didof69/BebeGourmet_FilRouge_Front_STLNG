import { Categorie } from "./categorie";
import { Restriction } from "./restriction";
import { Saison } from "./saison";

export interface CreateAliment {
  id?: number;
  libelle: string;
  age_introduction: number;
  id_categorie: number;
  saisons: Saison[];
  restrictions: Restriction[];
}
