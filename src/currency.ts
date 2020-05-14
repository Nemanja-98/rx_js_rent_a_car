// fetch('https://api.exchangeratesapi.io/latest?symbols=RSD,EUR')

import { WatchIgnorePlugin } from "webpack";
import { TIMEOUT, resolve } from "dns";

//..MOJ_API_KEY(zbog povezanosti sa kreditnom karticom) Nije commitovan pa se mapa ne prikazuje
export default async function getRates() {
  //let base = 'http://data.fixer.io/api/latest';
  const retval = await fetch(`http://data.fixer.io/api/latest?access_key=&base=EUR&symbols=RSD`)
    .then((res) => res.json())
    .then((data) => {
        return data;
        //promiseWorkAroundFunction(data.rates["RSD"]);
    })
    .catch((err) => console.log(err));
    if(retval.success){
      console.log("retval",retval);
      return retval.rates["RSD"];    
    }else{
      return 120;
    }
    
}
function drawNumber(cost : number){
    const div = document.querySelector(".euro");
    div.className="card text-success";
    div.innerHTML="1€====";

    const rsd = document.querySelector(".rsd");
    rsd.className="card text-success";
    rsd.innerHTML=cost+"rsd";
}

export async function calculateCost(ppl: number, litres: number) {
  const rsd=await getRates();
  console.log(rsd);
  return ppl * litres * rsd;
}
//
// http://data.fixer.io/api/convert

// http://data.fixer.io/api/latest
//     ? access_key = YOUR_ACCESS_KEY
//     & base = GBP
//     & symbols = USD,AUD,CAD,PLN,MXN
