import { Car } from "./Car";

export class Store {
  name: string;
  location: string;
  cars: Array<Car>;
  workHours: string;
  constructor(name :string, location :string, workHours :string) {
    this.name = name;
    this.location = location;
    this.cars = [];
    this.workHours = workHours;
  }

  addCar(el : Car){
    this.cars.push(el);
  }
}
