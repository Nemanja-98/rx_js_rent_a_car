export default function drawMain(host) {
    console.log("draw Main called");
    const container = document.createElement("div");
    container.className = "container";

    const divLists = document.createElement("div");
    divLists.className = "divLists";

    const divCars = document.createElement("div");
    divCars.className = "divCars";
    getCars(divCars);

    const divFuels = document.createElement("div");
    divFuels.className = "divFuels";
    getFuels(divFuels);

    divLists.appendChild(divCars);
    divLists.appendChild(divFuels);

    const divMap = document.createElement("div");
    divMap.className = "divMap";
    divMap.setAttribute("style","height:500px");
    //divMap.setAttribute("width","1000px");
    drawMap(divMap);

    const divCurrency = document.createElement("div");
    divCurrency.className = "divCurrency";
    drawCurrency(divCurrency);

    const divFinalize = document.createElement("div");
    divFinalize.className = "divFinalize";
    drawButtons(divFinalize);

    container.appendChild(divLists);
    container.appendChild(divMap);
    container.appendChild(divCurrency);
    container.appendChild(divFinalize);

    host.appendChild(container);
};

function getCars(host) {
    console.log("get Cars called");
    const h2=document.createElement("h2");
    h2.innerHTML="List of available Cars";

    const lista = document.createElement("div");

    fetch('https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/cars')
    .then(res => res.json())
    .then((data)=>{
        let output="";
        data.forEach((car) =>{
            output+=`
            <ul>
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
    console.log("get Fuels called");
    const h2=document.createElement("h2");
    h2.innerHTML="List of available Fuels for your car";

    const lista = document.createElement("div");

    fetch('https://my-json-server.typicode.com/Nemanja-98/rx_js_rent_a_car/fuels')
    .then(res => res.json())
    .then((data)=>{
        let output="";
        data.forEach((fuels) =>{
            output+=`
            <ul>
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
    console.log("draw Map called");
    const h2=document.createElement("h2");
    h2.innerHTML="Map";
    host.appendChild(h2);
}

function drawCurrency(host){
    console.log("draw Currency called");
    const h2=document.createElement("h2");
    h2.innerHTML="Estimated Price of Trip";
    host.appendChild(h2);
}

function drawButtons(host) {
    console.log("draw Buttons called");
    const h2=document.createElement("h2");
    h2.innerHTML="Press Confirm to go to next step.";
    host.appendChild(h2);
}
