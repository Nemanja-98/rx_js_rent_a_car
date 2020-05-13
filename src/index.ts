import drawMain from './drawPage';
import Mapa from './map';
import Rates from './currency'
import {calculateCost} from './currency'

import {btnClick} from './drawPage'
import {selectedElement} from './drawPage'
drawMain(document.body);

//Mapa();
//Rates();
//console.log(calculateCost(1.5,10));
setTimeout(() => {
    const buttons = document.querySelectorAll('button');
    //console.log(buttons);
    buttons.forEach( (el) => {
        el.addEventListener('click',btnClick);
    })

    const uls = document.querySelectorAll('ul');
    console.log("ULS",uls);
    uls.forEach( (el) => {
        el.addEventListener('click', selectedElement);
    })
}, 6000);
