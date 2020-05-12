// fetch('https://api.exchangeratesapi.io/latest?symbols=RSD,EUR')

import { WatchIgnorePlugin } from "webpack";
import { TIMEOUT } from "dns";

//..MOJ_API_KEY(zbog povezanosti sa kreditnom karticom) Nije commitovan pa se mapa ne prikazuje
export default function getRates():number{
    let retval;
    fetch(`http://data.fixer.io/api/latest?access_key=My_API_KEY_&base=EUR&symbols=RSD`)
    .then(res => res.json())
    .then((data)=>{
        setTimeout(() => {
            console.log("SAMO RSD",data.rates["RSD"]);
            retval = data.rates["RSD"];
        }, 2000);
       
        
    })
    .catch(err=>{console.log(err)});
    return retval;  
}

export async function calculateCost(ppl :number,litres :number){
    //to do:
    const rsd=await getRates();
    return ppl*litres*rsd;
}
//
// http://data.fixer.io/api/convert

// http://data.fixer.io/api/latest
//     ? access_key = YOUR_ACCESS_KEY
//     & base = GBP
//     & symbols = USD,AUD,CAD,PLN,MXN
    