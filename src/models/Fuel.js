const type = {
    GASOLINE: 'Gasoline',
    DIESEL: 'Diesel',
    ARKTIK: 'Premium Diesel Arktik',
    ETHANOL: 'Ethanol',
    PETROLEUM: 'Liquified Petroleum Gas',
    NATURAL_GAS: 'Compressed Natural Gas',
}

export class Fuel {
    constructor(typeKey, octane,price) {
        this.type = type[typeKey];
        this.octane = octane;
        this.pricePerLitre=price;
    }
}

