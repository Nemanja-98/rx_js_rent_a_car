export class Car {
    name: string;
    year: number;
    fuelType: string;
    kpl: number;
    engine: string;
    mileage: number;
    grades: Array<string>;
    img: string;
    downPayment: number;
    constructor(name, year, fuelType, kilometerPerLiter, engine, mileage, grades, img, downPayment) {
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