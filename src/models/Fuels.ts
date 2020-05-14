const typeOfFuel = {
    GASOLINE: 'Gasoline',
    DIESEL: 'Diesel',
    ARKTIK: 'Premium Diesel Arktik',
    ETHANOL: 'Ethanol',
    PETROLEUM: 'Liquified Petroleum Gas',
    CNG: 'Compressed Natural Gas',
}

export class Fuel {
    id: number;
    type: string;
    octane: number;
    pricePerLitre: number;
    availableInCar: Array<number>;
    constructor(id :number,typeKey :string, octane :number,price :number,carsId :Array<number>) {
        this.id = id;
        this.type = typeOfFuel[typeKey];
        this.octane = octane;
        this.pricePerLitre=price;
        this.availableInCar= carsId;
    }
}

