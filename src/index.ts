import Mapa from "./map";

import Rates from "./currency";
import { calculateCost } from "./currency";

import drawMain from "./drawPage";
import { btnClick } from "./drawPage";
import { selectedElement } from "./drawPage";
import {getCars} from './drawPage';
import {getFuels} from './drawPage';

import {Store} from './models/Store';
import {Fuel} from './models/Fuels';

drawMain(document.body);

const prod = new Store("RxjsStore","Aleksandra Medvedeva 14","8-16");
getCars(prod);

let fuels= new Array<Fuel>();
getFuels(fuels);

//Mapa();
 console.log("rejts",Rates());
setTimeout(() => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((el) => {
    el.addEventListener("click", btnClick);
  });

  const uls = document.querySelectorAll("ul");
  uls.forEach((el) => {
    el.addEventListener("click", selectedElement);
  });
}, 6000);
