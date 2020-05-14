import {} from "google-maps";
import axios from 'axios'


export let firstMarker;
export let secondMarker;
export let distance;

export default function fun() {
  const map = new google.maps.Map(
    document.getElementsByClassName("divMap")[0],
    {
      // Gradsko polje coords
      center: { lat: 43.329984, lng: 21.89525 },
      zoom: 16,
    }
  );

  google.maps.event.addListener(map, "click", (event) => {
    if (firstMarker && secondMarker) {
      firstMarker.setMap(null);
      secondMarker.setMap(null);
      firstMarker = secondMarker = null;
    }
    if (!firstMarker) {
      firstMarker = addMarker({
        coordinates: event.latLng,
        info: "<h4>Starting Point</h4>",
        iconImg: "http://maps.google.com/mapfiles/kml/pal5/icon12.png",
      });
    } else {
      secondMarker = addMarker({
        coordinates: event.latLng,
        info: "<h4>Targeted Destination</h4>",
        iconImg: "http://maps.google.com/mapfiles/kml/pal3/icon60.png",
      });
      getDirectoins(firstMarker, secondMarker);
    }
  });

  //coordinates for the Faculty of Electronic Engineering in Nis (location of my store)
  addMarker({
    coordinates: { lat: 43.331509, lng: 21.8925639 },
    info:
      "<h4>Rent A Car</h4>" +
      "<h5>Aleksandra Medvedeva 14</h5>" +
      "<h5>Nis 18000</h5>" +
      "<h5>Serbia</h5>",
    iconImg: "http://maps.google.com/mapfiles/kml/pal2/icon9.png",
  });

  function addMarker(props) {
    let mark = new google.maps.Marker({
      position: props.coordinates,
      map: map,
    });
    if (props.info) {
      const storeInfo = new google.maps.InfoWindow({
        content: props.info,
      });
      mark.addListener("click", () => {
        storeInfo.open(map, mark);
      });
    }
    if (props.iconImg) mark.setIcon(props.iconImg);
    return mark;
  }

async function getDirectoins(start, finish) {
  let dierctionDisplay = new google.maps.DirectionsRenderer();
  let directionService = new google.maps.DirectionsService();
  console.log(
    "lat",
    start.getPosition().lat(),
    "lng",
    start.getPosition().lng()
  );
  console.log(
    "lat",
    finish.getPosition().lat(),
    "lng",
    finish.getPosition().lng()
  );
  dierctionDisplay.setMap(map);
  const request = {
    origin: {
      lat: start.getPosition().lat(),
      lng: start.getPosition().lng(),
    },
    destination: {
      lat: finish.getPosition().lat(),
      lng: finish.getPosition().lng(),
    },
    travelMode: google.maps.TravelMode.DRIVING,
  };
  
  directionService.route(request, (result, status) => {
    if (status == "OK") {
      dierctionDisplay.setDirections(result);
    }
  });
  //custom hostovan backend jer google matrix api ne moze da se stavi na front end
  //for getting distance from point A to point B
  try {
    const res = await axios.post("http://localhost:3000/map", request);
    console.log(res);
    // console.log("filtered", res.data.rows[0].elements[0].distance.value);
    distance=res.data.rows[0].elements[0].distance.value;
  } catch (err) {
    console.log(err);
  }
  console.log(map);
}
}
//tried and true example nis-belgrade distance and travel time WORKS
  //https://maps.googleapis.com/maps/api/distancematrix/json?origins=43.329984,21.89525&destinations=44.787197,20.457273&departure_time=now
  //&key=

  // fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${request.origin.lat},${request.origin.lng}
  // &destinations=${request.destination.lat},${request.destination.lng}&key=`)
  // .then(res =>res.json())
  // .then(data => { console.log(data)})
  // .catch(err => console.log(err)); doesnt work 