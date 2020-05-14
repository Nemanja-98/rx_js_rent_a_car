// fetch('https://api.exchangeratesapi.io/latest?symbols=RSD,EUR')

import { WatchIgnorePlugin } from "webpack";
import { TIMEOUT, resolve } from "dns";

//..MOJ_API_KEY(zbog povezanosti sa kreditnom karticom) Nije commitovan pa se mapa ne prikazuje
export default async function getRates() {
  let retval = 0;
  let base = 'http://data.fixer.io/api/latest';
  fetch(`${base}?access_key=MOJ_API_KEY&base=EUR&symbols=RSD`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        promiseWorkAroundFunction(data.rates["RSD"]);
    //   setTimeout(() => {
    //       console.log("SAMO RSD",data.rates["RSD"]);
    //       return data.rates["RSD"];
    //   }, 2000);
    //   //retval = data.rates["RSD"];
    })
    .catch((err) => console.log(err));
}
function promiseWorkAroundFunction(nesto){
    console.log(nesto,"nesto");
    const div = document.querySelector(".euro");
    div.className="card text-success";
    div.innerHTML="1€====";

    const rsd = document.querySelector(".rsd");
    rsd.className="card text-success";
    rsd.innerHTML=nesto+"rsd";
    return nesto;
}

export async function calculateCost(ppl: number, litres: number) {
  //to do:
  let rsd=0;
  //rsd=await getRates();
  //getRates().then((rez) =>{rsd=rez});
  return ppl * litres * rsd;
}
//
// http://data.fixer.io/api/convert

// http://data.fixer.io/api/latest
//     ? access_key = YOUR_ACCESS_KEY
//     & base = GBP
//     & symbols = USD,AUD,CAD,PLN,MXN
