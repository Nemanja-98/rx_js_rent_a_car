export default function fun() {
    const mapa = new google.maps.Map(document.getElementsByClassName("divMap")[0], {
        center: { lat: 43.3209, lng: 21.8958 },
        zoom: 16
    });
    mapa.className = "map";
    const icon = {
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(46.3209, 26.895) // anchor
    };
    let marker = new google.maps.Marker({
        position: { lat: 43.331509, lng: 21.8925639 },
        map: mapa,
        icon:icon,
    })
}