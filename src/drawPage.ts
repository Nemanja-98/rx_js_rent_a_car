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

    fetch('https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/cars')
    .then(res => res.json())
    .then((data)=>{
        let output="";
        data.forEach((car) =>{
            output+=`
            <ul class="card col-3">
            <li>ID: ${car.id}</li>
            <li>Name: ${car.name}</li>
            <li>Year: ${car.year}</li>
            <li>Fuel: ${car.fuelType}</li>
            <li>Km per Litre: ${car.kpl}</li>
            <li>Engine: ${car.engine}</li>
            <li>Mileage: ${car.mileage}</li>
            <li>Grades: ${car.grades}</li>
            <li>Img: ${car.img}</li>
            <li>Down Payment: ${car.downPayment}</li>
            </ul>`;
        })
        lista.innerHTML=output;
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

    fetch('https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/fuels')
    .then(res => res.json())
    .then((data)=>{
        let output="";
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
