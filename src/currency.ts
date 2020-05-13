// fetch('https://api.exchangeratesapi.io/latest?symbols=RSD,EUR')

import { WatchIgnorePlugin } from "webpack";
import { TIMEOUT } from "dns";

//..MOJ_API_KEY(zbog povezanosti sa kreditnom karticom) Nije commitovan pa se mapa ne prikazuje
export default async function getRates(){
    let retval=0;
    fetch(`http://data.fixer.io/api/latest?access_key=MOJ_API_KEY&base=EUR&symbols=RSD`)
    .then(res => res.json())
    .then((data)=>{
        // setTimeout(() => {
        //     console.log("SAMO RSD",data.rates["RSD"]);
        //     retval = data.rates["RSD"];
        // }, 2000);
        retval = data.rates["RSD"];
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
    