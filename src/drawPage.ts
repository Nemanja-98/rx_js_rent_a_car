
import Fiat from './abcdefg.png';
import Preloader from './preloader.gif';
const punto = require('./assets/clio.png');
console.log(punto);
//console.log(Fiat);

export default function drawMain(host) {
    
    const container = document.createElement("div");
    container.className = "container";

    const divLists = document.createElement("div");
    divLists.className = "divLists container";

    const divCars = document.createElement("div");
    divCars.className = "divCars container";
    getCars(divCars);

    const divFuels = document.createElement("div");
    divFuels.className = "divFuels container";
    getFuels(divFuels);

    divLists.appendChild(divCars);
    divLists.appendChild(divFuels);

    const divMap = document.createElement("div");
    divMap.className = "divMap container";
    divMap.setAttribute("style","height:500px");
    //divMap.setAttribute("width","1000px");
    drawMap(divMap);

    const divCurrency = document.createElement("div");
    divCurrency.className = "divCurrency container";
    drawCurrency(divCurrency);

    const divFinalize = document.createElement("div");
    divFinalize.className = "divFinalize container";
    drawButtons(divFinalize);

    container.appendChild(divLists);
    container.appendChild(divMap);
    container.appendChild(divCurrency);
    container.appendChild(divFinalize);

    host.appendChild(container);
};

function getCars(host) {
   
    const h2=document.createElement("h2");
    h2.innerHTML="List of available Cars";
    h2.className="row"

    const lista = document.createElement("div");
    lista.className="row"
    const preloader = document.createElement("img")
    preloader.src=Preloader;

    lista.appendChild(preloader);

    fetch('https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/cars')
    .then(res => res.json())
    .then((data)=>{
        let output="";
        setTimeout( () =>{
        data.forEach((car) =>{
            output+=`
            <ul class="card col-4">
            <img class="card-img-top" src=${car.img} height=100 width=100></img>
            <li>Name: ${car.name}</li>
            <button class="row btn btn-info">View Details</button>
            <li hidden=true>Year: ${car.year}</li>
            <li hidden=true>Fuel: ${car.fuelType}</li>
            <li hidden=true>Km per Litre: ${car.kpl}</li>
            <li hidden=true>Engine: ${car.engine}</li>
            <li hidden=true>Mileage: ${car.mileage}</li>
            <li hidden=true>Grades: ${car.grades}</li>
            <li hidden=true>Down Payment: ${car.downPayment}$</li>
            </ul>`;
        })
        lista.innerHTML=output;
        },3000);
    })
    host.appendChild(h2);
    host.appendChild(lista);
}

function getFuels(host) {
    
    const h2=document.createElement("h2");
    h2.innerHTML="List of available Fuels for your car";
    h2.className="row"

    const lista = document.createElement("div");
    lista.className="row"
    setTimeout(() => {
        const preloader = document.createElement("img")
        preloader.src=Preloader;
        lista.appendChild(preloader);
        
    }, 3200);
    fetch('https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/fuels')
    .then(res => res.json())
    .then((data)=>{
        let output="";
        setTimeout(() => {
        data.forEach((fuels) =>{
            output+=`
            <ul class="card col-4">
            <li>ID: ${fuels.id}</li>
            <li>Name: ${fuels.name}</li>
            <li>Purity: ${fuels.purity}</li>
            <li>Price Per Litre: ${fuels.price}</li>
            </ul>`;
        })
        lista.innerHTML=output;
        }, 5000);
    })
    host.appendChild(h2);
    host.appendChild(lista);
}

function drawMap(host) {
   
    const h2=document.createElement("h2");
    h2.innerHTML="Map";
    h2.className="row"
    host.appendChild(h2);
}

function drawCurrency(host){
   
    const h2=document.createElement("h2");
    h2.innerHTML="Estimated Price of Trip";
    h2.className="row"
    host.appendChild(h2);
}

function drawButtons(host) {
   
    const h2=document.createElement("h2");
    h2.innerHTML="Press Confirm to go to next step.";
    h2.className="row"
    host.appendChild(h2);
}

function btnClick(event){
    console.log(event.target.parentNode);
    event.target.parentNode.childNodes.forEach(element => {
        element.hidden===true?
         element.hidden=false :
         element.hidden!==""? element.hidden=true : element.hidden="";
        
    });
}