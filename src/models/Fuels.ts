const typeOfFuel = {
    GASOLINE: 'Gasoline',
    DIESEL: 'Diesel',
    ARKTIK: 'Premium Diesel Arktik',
    ETHANOL: 'Ethanol',
    PETROLEUM: 'Liquified Petroleum Gas',
    CNG: 'Compressed Natural Gas',
}

export class Fuel {
    type: string;
    octane: number;
    pricePerLitre: number;
    constructor(typeKey, octane,price) {
        this.type = typeOfFuel[typeKey];
        this.octane = octane;
        this.pricePerLitre=price;
    }
}

