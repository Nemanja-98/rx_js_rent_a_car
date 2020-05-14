
import {Store} from './models/Store'
import {Fuel} from './models/Fuels'
import {Car} from './models/Car'
import {of,from} from 'rxjs'
import {switchMap,take} from 'rxjs/operators'
import {fromEntries} from './funtions'

export function getCars(store : Store){
    const lista = document.querySelector(".Cars");
    fetch("https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/cars")
      .then((res) => res.json())
      .then((data) => {
        const cars = data.map((car) => {
            const newCar = []
            const takeSeven = from(Object.entries(car)).pipe(take(7))
            takeSeven.subscribe(x => newCar.push(x));
            return fromEntries(newCar);
          })
        let output = "";
        setTimeout(() => {
          data.forEach((car) => {
            store.addCar(new Car(car.id,car.name,car.year,car.fuelType,car.kpl,car.engine,car.mileage,car.grades,car.img,car.downPayment));
            
            output+= `<ul class="card col-3">
              <img class="card-img-top" src=${car.img} height=100 width=100></img>
              <label>Name: ${car.name}</label>
              <button class="row btn btn-info">View Details</button>`
            const notToShow = ['img', 'id', 'name']
            const switched = of(Object.entries(car)).pipe(switchMap( (el) => el));
            switched.subscribe( x => notToShow.includes(x[0]) ? null : output+=`<li class="${x[0]}" hidden=true>${x[0]}: ${x[1]}</li>`);
            // switched.subscribe( x => output+=`<li class="${x[0]}" hidden=true>${x[0]}: ${x[1]}</li>`);
            output+= `</ul>`
          });
          lista.innerHTML = output;
        }, 3000);
      });
  }
export function getFuels(array){
    const lista =  document.querySelector(".fuels");
    fetch("https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/fuels")
    .then((res) => res.json())
    .then((data) => {
      let output = "";
      setTimeout(() => {
        data.forEach((fuels) => {
          array.push(new Fuel(data.id,data.name,data.purity,data.price,data.availableInCar));
          output += `
            <ul class="card col-4">
            <li>Name: ${fuels.name}</li>
            <li>Purity: ${fuels.purity}</li>
            <li class="ppl">Price Per Litre in €: ${fuels.price}</li>
            </ul>`;
        });
        lista.innerHTML = output;
      }, 5000);
    });
}