// export default function fun(mapa) {
//     let script = document.createElement('script');
//     script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD8LlLC-YVOClHXc5gwrOy_AE2e3-h3MVo&callback=initMap';
//     script.defer = true;
//     script.async = true;
//     document.head.appendChild(script);
//     mapa = new google.maps.Map(document.getElementsByClassName("divMap")[0], {
//         center: { lat: 43.3209, lng: 21.8958 },
//         zoom: 8
//     });
//     mapa.className = "map";
//     let marker = new google.maps.Marker({
//         position: { lat: 43.3209, lng: 21.895 },
//         map: map,
//     })
// }