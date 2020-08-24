export class Ingredient {
    name: string;
    amount: number;
    unit: string;
    url: string;

    constructor(name: string, amount: number, unit: string, url: string) {
        this.name = name;
        this.amount = amount;
        this.unit = unit;
        this.url = url;
    }
}