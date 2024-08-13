export interface Post {
  id: number,
  title: string;
  subtitle: string;
  star: number;
  detail: string;
  imageUrl?: string;
  type: string;
  time: string;
  difficulty: string;
  macroNutrients: string[];
  ingredients: string[];
}