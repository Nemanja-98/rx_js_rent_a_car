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
    drawMap(divMap);

    const divFinalize = document.createElement("div");
    divFinalize.className = "divFinalize";
    drawButtons(divFinalize);

    container.appendChild(divLists);
    container.appendChild(divMap);
    container.appendChild(divFinalize);

    host.appendChild(container);
};

function getCars(host) {
    console.log("get Cars called");
    const h2=document.createElement("h2");
    h2.innerHTML="List of available Cars";
    host.appendChild(h2);
}

function getFuels(host) {
    console.log("get Fuels called");
    
    const h2=document.createElement("h2");
    h2.innerHTML="List of available Fuels for your car";

    host.appendChild(h2);
}

function drawMap(host) {
    console.log("draw Map called");
    
    // const h2=document.createElement("h2");
    // h2.innerHTML="Map";
    
    // host.appendChild(h2);
}

function drawButtons(host) {
    console.log("draw Buttons called");

    
    const h2=document.createElement("h2");
    h2.innerHTML="Press Confirm to go to next step.";

    host.appendChild(h2);
}
