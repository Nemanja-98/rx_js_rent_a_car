import { Store } from "./models/Store";
import {validateInput} from './funtions';

export default function drawMain(host) {
  const container = document.createElement("div");
  container.className = "container";

  const divRecommend = document.createElement("div");
  divRecommend.className = "divRecommended";


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

  drawMap(divMap);

  const divCurrency = document.createElement("div");
  divCurrency.className = "divCurrency container";
  drawCurrency(divCurrency);

 
  const validateInputBtn = document.createElement("anchor");
  validateInputBtn.innerHTML = "Validate Input";
  validateInputBtn.className = "btn btn-primary";
  validateInputBtn.setAttribute("data-toggle","modal");
  validateInputBtn.setAttribute("data-target","#myModal");
  validateInputBtn.addEventListener('click',validateInput);

  divCurrency.appendChild(validateInputBtn);

  container.appendChild(divRecommend);
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
export function drawRecommended(prod : Store){
  const niz =prod.cars.filter( el => el.kpl >0.8);
  const litresPerHundredKm = niz.map(el =>el.kpl *100);
  
  const div = document.querySelector(".divRecommended");
  const h4 = document.createElement("h4");
  h4.innerHTML="We recommend "
  niz.forEach( (el,index) =>{
    index!==niz.length-1 ?
      h4.innerHTML+=el.name + " or ":
      h4.innerHTML+=el.name;
  })
  h4.innerHTML+=" as our best Economic car choices. They use ";
  litresPerHundredKm.forEach( (el,index) =>{
    index!==niz.length-1 ?
      h4.innerHTML+=el + ", ":
      h4.innerHTML+=el ;
  })
  h4.innerHTML+=" liters of fuel per 100km respectively.";
  div.appendChild(h4);
}

