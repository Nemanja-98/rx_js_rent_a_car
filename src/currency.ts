// fetch('https://api.exchangeratesapi.io/latest?symbols=RSD,EUR')

import { WatchIgnorePlugin } from "webpack";
import { TIMEOUT, resolve } from "dns";
import {distance} from './map'
import {API_KEY} from './index';

//..MOJ_API_KEY(zbog povezanosti sa kreditnom karticom) Nije commitovan pa se mapa ne prikazuje
export default async function getRates() {
  const retval = await fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}&base=EUR&symbols=RSD`)
    .then((res) => res.json())
    .then((data) => {
        return data;
        //promiseWorkAroundFunction(data.rates["RSD"]);
    })
    .catch((err) => console.log(err));
    if(retval.success){
      
      return retval.rates["RSD"];    
    }else{
      return 120;
    }
    
}

export async function calculateCost(ppl: number, litres: number) {
  const rsd=await getRates();
  
  return (distance*ppl * litres * rsd)/1000;
}
//
// http://data.fixer.io/api/convert

// http://data.fixer.io/api/latest
//     ? access_key = YOUR_ACCESS_KEY
//     & base = GBP
//     & symbols = USD,AUD,CAD,PLN,MXN
