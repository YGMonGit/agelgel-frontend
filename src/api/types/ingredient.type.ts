export interface IIngredient {
    _id: string;
    name: string;
    localName: string;
    type: string;
    unit: string;
}

export interface INewIngredientFrom {
    name: string;
    type: string;
    unit: string;
}

export interface IngredientUpdateFrom extends Partial<INewIngredientFrom> {
}


