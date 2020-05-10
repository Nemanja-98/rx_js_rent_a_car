import {} from 'google-maps';
//var google:any;
export default function fun() {
    const map = new google.maps.Map(document.getElementsByClassName("divMap")[0], {
        // Gradsko polje coords
        center: { lat: 43.329984, lng: 21.89525 },
        zoom: 16
    });
    //map.className = "map";

    let first;
    let second;
    google.maps.event.addListener(map, 'click', (event) => {
        if (first && second) {
            first.setMap(null);
            second.setMap(null);
            first = second = null;
        }
        if (!first) {
            first = addMarker({
                coordinates: event.latLng,
                info: '<h4>Starting Point</h4>',
                iconImg: 'http://maps.google.com/mapfiles/kml/pal5/icon12.png'
            });
        }
        else {
            second = addMarker({
                coordinates: event.latLng,
                info: '<h4>Targeted Destination</h4>',
                iconImg: 'http://maps.google.com/mapfiles/kml/pal3/icon60.png'
            });
          getDirectoins(first,second); //uncomment when your api gets approval
        }

    })

    //coordinates for the Faculty of Electronic Engineering in Nis (location of my store)
    addMarker({
        coordinates: { lat: 43.331509, lng: 21.8925639 },
        info: '<h4>Rent A Car</h4>' +
            '<h5>Aleksandra Medvedeva 14</h5>' +
            '<h5>Nis 18000</h5>' +
            '<h5>Serbia</h5>',
        iconImg: 'http://maps.google.com/mapfiles/kml/pal2/icon9.png',
    });

    function addMarker(props) {
        let mark = new google.maps.Marker({
            position: props.coordinates,
            map: map,
        })
        if (props.info) {
            const storeInfo = new google.maps.InfoWindow({
                content: props.info
            })
            mark.addListener('click', () => {
                storeInfo.open(map, mark);
            })
        }
        if (props.iconImg)
            mark.setIcon(props.iconImg);
        return mark;
    }

    function getDirectoins(start,finish) {
        let dierctionDisplay = new google.maps.DirectionsRenderer();
        let directionService = new google.maps.DirectionsService();

        dierctionDisplay.setMap(map);
        const request = {
            origin: { lat: start.getPosition().lat(), lng: start.getPosition().lng() },
            destination: { lat: finish.getPosition().lat(), lng: finish.getPosition().lng() },
            travelMode: google.maps.TravelMode.DRIVING

        };
        directionService.route(request, (result, status) => {
            if (status == "OK") {
                dierctionDisplay.setDirections(result);
            }
        });
    }

}
  //custom icon object if i decide to use it
    // const icon = {
    //      url:'',
    //     scaledSize: new google.maps.Size(50, 50), 
    //     origin: new google.maps.Point(0,0), 
    //     anchor: new google.maps.Point(46.3209, 26.895)
    // };