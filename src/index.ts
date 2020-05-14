import Mapa from "./map";

import Rates, { calculateCost } from "./currency";

import drawMain,{ btnClick, selectedElement, getCars, getFuels} from "./drawPage";

import {Store} from './models/Store';
import {Fuel} from './models/Fuels';
import axios from 'axios';
drawMain(document.body);

const prod = new Store("RxjsStore","Aleksandra Medvedeva 14","8-16");
getCars(prod);
//prod.iscrtaj();

let fuels= new Array<Fuel>();
getFuels(fuels);

//Mapa();

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

/*
for economic cars section filter whose kpl is above 0.8  then map kpl* dinar_value then multiply each el by 100 
and that's their cost to buy fuel for a 100km trip
const suma =niz.filter(x=>x>0)
.map(x=>x*2)
.reduce((acc,current)=> acc+=current,0);
*/