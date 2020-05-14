import { fromEvent, interval, merge } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {of, zip} from 'rxjs'
import {map} from 'rxjs/operators'
import {firstMarker,secondMarker} from "./map";
import { calculateCost } from "./currency";
let formInputTime = 0;

export const formInputTimer = () => {
  const validateBtn = document.querySelector("anchor");
  const source = interval(1000);
  const clicks = fromEvent(validateBtn, 'click');
  const result = source.pipe(takeUntil(clicks));
  result.subscribe(x => formInputTime++);
}

export const triggerInputValidation = () => {
  try {
    const clicks1 = fromEvent(document.querySelector('.Cars'), 'click');
    const clicks2 = fromEvent(document.querySelector('.fuels'), 'click');
    const clicksOrTimer = merge(clicks1, clicks2);
    clicksOrTimer.subscribe(x => {document.getElementById('notificaiton').innerHTML += `
      <a type="button" class="btn btn-primary mt-2">
        Another 33% done
      </a>
    `});
  
    const removeLastNotification = setInterval(function(){ 
      const select = document.getElementById('notificaiton');
      if(select != null && select.lastChild!=null)
        select.removeChild(select.lastChild); 
    }, 200);
  } catch (err) {
    console.log(err)
  }

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
  
  export function validateInput(){
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerHTML = `Your Inital Form Finish time is: ${formInputTime}s`;
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
           
  
            const litres = document.querySelector(".divFuels").querySelector(".bg-primary").querySelector(".ppl");
            console.log("kpl:",Number(kpl.textContent.substr(5)),"litres:",Number(litres.textContent.substr(22)));
            
            const total =await calculateCost(Number(kpl.textContent.substr(5)),Number(litres.textContent.substr(22)));
            console.log("total is",total);
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
  // util function
export function fromEntries<T>(entries: [keyof T, T[keyof T]][]): T {
    return entries.reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      <T>{}
    );
}