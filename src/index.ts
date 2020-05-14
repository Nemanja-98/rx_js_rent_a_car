import Mapa from "./map";

import Rates, { calculateCost } from "./currency";

import drawMain,{drawRecommended} from "./drawPage";

import {Store} from './models/Store';
import {Fuel} from './models/Fuels';
import {btnClick,selectedElement,formInputTimer,triggerInputValidation} from './funtions'
import {getFuels,getCars} from './fetches'
export const API_KEY = '';

drawMain(document.body);

const prod = new Store("RxjsStore","Aleksandra Medvedeva 14","8-16");
getCars(prod);
setTimeout(() => {
  drawRecommended(prod);  
}, 6000);



let fuels= new Array<Fuel>();
getFuels(fuels);

Mapa();

setTimeout(() => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((el) => {
    el.addEventListener("click", btnClick);
  });

  const uls = document.querySelectorAll("ul");
  uls.forEach((el) => {
    el.addEventListener("click", selectedElement);
  });
}, 7000);


formInputTimer()
triggerInputValidation()

/*
for economic cars section filter whose kpl is above 0.8  then map kpl* dinar_value then multiply each el by 100 
and that's their cost to buy fuel for a 100km trip
const suma =niz.filter(x=>x>0)
.map(x=>x*2)
.reduce((acc,current)=> acc+=current,0);
*/