import { Car } from "./Car";

export class Store {
  name: string;
  location: string;
  cars: Array<Car>;
  workHours: string;
  constructor(name, location, workHours) {
    this.name = name;
    this.location = location;
    this.cars = [];
    this.workHours = workHours;
  }

  addCar(el){
    this.cars.push(el);
  }
}
