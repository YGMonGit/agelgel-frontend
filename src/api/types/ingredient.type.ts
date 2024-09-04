export interface IIngredient {
    _id: string;
    name: string;
    localName: string;
    type: string;
    unitOptions: string[];
}

export interface INewIngredientFrom {
    name: string;
    localName: string;
    type: string;
    unitOptions: string[];
}

export interface IngredientUpdateFrom extends Partial<INewIngredientFrom> {
}


