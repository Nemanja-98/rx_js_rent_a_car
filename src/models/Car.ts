export class Car {
    id: number;
    name: string;
    year: number;
    fuelType: string;
    kpl: number;
    engine: string;
    mileage: number;
    grades: Array<string>;
    img: string;
    downPayment: number;
    constructor(id :number,name :string, year :number, fuelType :string, kilometerPerLiter :number, engine :string , mileage :number,
         grades :Array<string>, img :string, downPayment :number) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.fuelType = fuelType;
        this.kpl = kilometerPerLiter;
        this.engine = engine;
        this.mileage = mileage;
        this.grades = grades;
        this.img = img;
        this.downPayment = downPayment;
    }
}