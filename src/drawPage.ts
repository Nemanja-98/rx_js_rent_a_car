import { Store } from "./models/Store";
import { Car } from "./models/Car";
import {firstMarker,secondMarker} from "./map";
import { Fuel } from "./models/Fuels";
import { calculateCost } from "./currency";
import {of, zip} from 'rxjs'
import {switchMap,map,take} from 'rxjs/operators'

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
  const validateInputBtn = document.createElement("anchor");
  validateInputBtn.innerHTML = "Validate Input";
  validateInputBtn.className = "btn btn-primary";
  validateInputBtn.setAttribute("data-toggle","modal");
  validateInputBtn.setAttribute("data-target","#myModal");
  validateInputBtn.addEventListener('click',validateInput);

  divCurrency.appendChild(validateInputBtn);

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
          output+= `<ul class="card col-3">
            <img class="card-img-top" src=${car.img} height=100 width=100></img>
            <label>Name: ${car.name}</label>
            <button class="row btn btn-info">View Details</button>`
          
          const switched = of(Object.entries(car)).pipe(switchMap( (el) => el));
          switched.subscribe( x => output+=`<li class="${x[0]}" hidden=true>${x[0]}: ${x[1]}</li>`);
          output+= `</ul>`
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
          <li class="ppl">Price Per Litre in €: ${fuels.price}</li>
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

  div.appendChild(divDistance);
  div.appendChild(divEuro);
  div.appendChild(divRsd);

  host.appendChild(h2);
  host.appendChild(div);
}

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

function validateInput(){
  const validateBtn = document.querySelector("anchor");
  validateBtn.className = "btn btn-primary";
  validateBtn.innerHTML = "Validate Input";
  const modal = document.querySelector(".modal-body");
  const carSelected = of<Boolean>(Boolean(document.querySelector(".divCars").querySelector(".bg-primary")));
  const fuelSelected = of<Boolean>(Boolean(document.querySelector(".divFuels").querySelector(".bg-primary")));
  const isFirstMarker = of<Boolean>(Boolean(firstMarker));
  const isSecondMarker = of<Boolean>(Boolean(secondMarker));
  zip(carSelected,fuelSelected,isFirstMarker,isSecondMarker).pipe(
    map(
      ([carSelected,fuelSelected,isFirstMarker,isSecondMarker]) => 
      ({carSelected,fuelSelected,isFirstMarker,isSecondMarker})))
      .subscribe(async (x) => {
        console.log(x);
        if (x.carSelected && x.fuelSelected && x.isFirstMarker && x.isSecondMarker) {
          validateBtn.className = "btn btn-success";
          validateBtn.innerHTML += '✅';
          const kpl = document.querySelector(".divCars").querySelector(".bg-primary").querySelector(".kpl");
          console.log(kpl.textContent.substr(5));

          const litres = document.querySelector(".divFuels").querySelector(".bg-primary").querySelector(".ppl");
          console.log(litres.textContent.substr(22));
         
          const total =await calculateCost(Number(kpl.textContent.substr(5)),Number(litres.textContent.substr(22)));
          console.log("total eheh",total);
          modal.innerHTML = `The estimated Total Cost of your trip is: ${total} dinars`;
          
        }else{
          validateBtn.className = "btn btn-danger";
          validateBtn.innerHTML = '❌';
          modal.innerHTML = `Oh, no! It seems the validation vailed. Please check your input.`;
        }
        setTimeout(() => {
          validateBtn.className = "btn btn-primary";
          validateBtn.innerHTML = "Validate Input";
        }, 1200);
      });
  
}