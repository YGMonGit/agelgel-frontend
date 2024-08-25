import axios, { AxiosInstance } from 'axios';


const Key = process.env.REACT_APP_SPOONACULAR_API_KEY;

export default class SpoonacularClient {
    private apiKey: string;
    private client: AxiosInstance;

    constructor(apiKey: string = Key ?? "") {
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: 'https://api.spoonacular.com',
            params: {
                apiKey: this.apiKey
            }
        });
    }

    async searchIngredients(params: IngredientSearchParams): Promise<IngredientSearchResponse> {
        try {
            const response = await this.client.get<IngredientSearchResponse>('/food/ingredients/search', {
                params
            });
            return response.data;
        } catch (error) {
            console.error(`Failed to search ingredients: ${error}`);
            throw error;
        }
    }

    async getIngredientImage(name: string): Promise<any> {
        try {
            const ingredients = await this.searchIngredients({
                query: name,
                number: 1,
                sortDirection: 'asc',

            });
            if (ingredients.results.length === 0) {
                throw new Error(`No ingredient found for name: ${name}`);
            }
            return `https://spoonacular.com/cdn/ingredients_100x100/${ingredients.results[0].image}`;
        } catch (error) {
            console.error(`Failed to get ingredient image: ${error}`);
            // throw error;
        }
    }

    async getIngredientsImages(names: string[]): Promise<string[]> {
        return Promise.all(names.map(name => this.getIngredientImage(name)));
    }
}