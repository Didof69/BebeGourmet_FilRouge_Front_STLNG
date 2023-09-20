import { Categorie } from "./categorie";
import { Restriction } from "./restriction";
import { Saison } from "./saison";

export interface Aliment {
  id: number;
  libelle: string;
  age_introduction: number;
  id_categorie: number;
  category: Categorie;
  saisons: Saison[];
  restrictions: Restriction[];
}
