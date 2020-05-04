export default function fun() {
    const mapa = new google.maps.Map(document.getElementsByClassName("divMap")[0], {
        center: { lat: 43.3209, lng: 21.8958 },
        zoom: 16
    });
    mapa.className = "map";
    const icon = {
        url: "https://library.kissclipart.com/20180925/rpe/kissclipart-map-car-icon-clipart-car-google-maps-navigation-c81a6a2d0ecb7a15.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };
    let marker = new google.maps.Marker({
        position: { lat: 43.3209, lng: 21.895 },
        map: mapa,
        icon:icon,
    })
}