//import Preloader from './preloader.gif';

import { Store } from "./models/Store";
import { Car } from "./models/Car";
import fun from "./map";
import { Fuel } from "./models/Fuels";
import { calculateCost } from "./currency";
import {of} from 'rxjs'
import {switchMap} from 'rxjs/operators'

export default function drawMain(host) {
  const container = document.createElement("div");
  container.className = "container";

  const divLists = document.createElement("div");
  divLists.className = "divLists container";

  const divCars = document.createElement("div");
  divCars.className = "divCars container";
  drawCars(divCars);

  const divFuels = document.createElement("div");
  divFuels.className = "divFuels container";
  drawFuels(divFuels);

  divLists.appendChild(divCars);
  divLists.appendChild(divFuels);

  const divMap = document.createElement("div");
  divMap.className = "divMap container";
  divMap.setAttribute("style", "height:500px");
  //divMap.setAttribute("width","1000px");
  drawMap(divMap);

  const divCurrency = document.createElement("div");
  divCurrency.className = "divCurrency container";
  drawCurrency(divCurrency);

  // const divFinalize = document.createElement("div");
  // divFinalize.className = "divFinalize container";
  // drawButtons(divFinalize);

  container.appendChild(divLists);
  container.appendChild(divMap);
  container.appendChild(divCurrency);
  // container.appendChild(divFinalize);

  host.appendChild(container);
}

function drawCars(host) {
  const h2 = document.createElement("h2");
  h2.innerHTML = "List of available Cars";
  h2.className = "row";

  const lista = document.createElement("div");
  lista.className = "row Cars";
  const preloader = document.createElement("div");
  preloader.className = "spinner-border text-info";

  lista.appendChild(preloader);
  //getCars(lista);
  
  host.appendChild(h2);
  host.appendChild(lista);
}
export function getCars(store : Store){
  const lista = document.querySelector(".Cars");
  fetch("https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/cars")
    .then((res) => res.json())
    .then((data) => {
      let output = "";
      setTimeout(() => {
        data.forEach((car,index) => {
          store.addCar(new Car(car.id,car.name,car.year,car.fuelType,car.kpl,car.engine,car.mileage,car.grades,car.img,car.downPayment));
          // const fields = Object.keys(car);
          // const values = Object.values(car);
          console.log(car);
          output+= `<ul class="card col-3">
            <img class="card-img-top" src=${car.img} height=100 width=100></img>
            <label>Name: ${car.name}</label>
            <button class="row btn btn-info">View Details</button>`
          
          const switched = of(Object.entries(car)).pipe(switchMap( (el) => el));
          switched.subscribe( x => output+=`<li hidden=true>${x[0]}: ${x[1]}</li>`);
          output+= `</ul>`
          // output += `
          //   <ul class="card col-3">
          //   <img class="card-img-top" src=${car.img} height=100 width=100></img>
          //   <label>Name: ${car.name}</label>
          //   <button class="row btn btn-info">View Details</button>
          //   <li hidden=true>Year: ${car.year}</li>
          //   <li hidden=true>Fuel: ${car.fuelType}</li>
          //   <li hidden=true>Km per Litre: ${car.kpl}</li>
          //   <li hidden=true>Engine: ${car.engine}</li>
          //   <li hidden=true>Mileage: ${car.mileage}</li>
          //   <li hidden=true>Grades: ${car.grades}</li>
          //   <li hidden=true>Down Payment: ${car.downPayment}€</li>
          //   </ul>`;
        });
        lista.innerHTML = output;
      }, 3000);
    });
}

function drawFuels(host) {
  const h2 = document.createElement("h2");
  h2.innerHTML = "List of available Fuels for your car";
  h2.className = "row";

  const lista = document.createElement("div");
  lista.className = "row fuels";
  setTimeout(() => {
    const preloader = document.createElement("div");
    preloader.className = "spinner-border text-info";
    lista.appendChild(preloader);
  }, 3200);
 
  host.appendChild(h2);
  host.appendChild(lista);
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
          <li>Price Per Litre: ${fuels.price}€</li>
          </ul>`;
      });
      lista.innerHTML = output;
    }, 5000);
  });
}

function drawMap(host) {
  const h2 = document.createElement("h2");
  h2.innerHTML = "Map";
  h2.className = "row";
  host.appendChild(h2);
}

async function drawCurrency(host) {
  const h2 = document.createElement("h2");
  h2.innerHTML = "Estimated Price of Trip";
  h2.className = "row";

  const div = document.createElement("div");
  div.className = "row";

  const divDistance = document.createElement("div");
  divDistance.className = "col-4 distance";

  const divEuro = document.createElement("div");
  divEuro.className = "col-4 euro";

  const divRsd = document.createElement("div");
  divRsd.className = "col-4 rsd";

  divRsd.innerHTML =String( await calculateCost(0.8,1.5));
  div.appendChild(divDistance);
  div.appendChild(divEuro);
  div.appendChild(divRsd);

  host.appendChild(h2);
  host.appendChild(div);
}

// function drawButtons(host) {

//     const h2=document.createElement("h2");
//     h2.innerHTML="Press Confirm to go to next step.";
//     h2.className="row"
//     host.appendChild(h2);
// }

export function btnClick(event) {
  event.target.innerHTML === "View Details"
    ? (event.target.innerHTML = "Hide Details")
    : (event.target.innerHTML = "View Details");

  event.target.parentNode.childNodes.forEach((element) => {
    element.hidden === true
      ? (element.hidden = false)
      : element.tagName === "LI"
      ? (element.hidden = true)
      : null;
  });
}
// to do
export function selectedElement(event) {
  if (event.target.tagName !== "BUTTON") {
    unselectPrevious(this.parentNode.childNodes);
    this.classList.add("bg-primary");
  }
}
function unselectPrevious(array) {
  array.forEach((element) => {
    if (element.classList != null) element.classList.remove("bg-primary");
  });
}
