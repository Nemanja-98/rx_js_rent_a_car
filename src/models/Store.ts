import { Car } from "./Car";

export class Store {
    name: string;
    location: string;
    cars: Array<Car>;
    workHours: string;
    constructor(name, location, cars, workHours) {
        this.name = name;
        this.location = location;
        this.cars = cars;
        this.workHours = workHours;
    }
}