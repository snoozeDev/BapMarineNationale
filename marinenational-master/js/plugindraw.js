/*//création du plugin 
var drawPolygonButton = document.getElementById('drawPolygon');
var stopDrawButton = document.getElementById('stopDraw');
var getDataButton = document.getElementById('getData');
var currentPolygon = {}; //Empty object to be used later;

drawPolygonButton.addEventListener('click', function(){
    currentPolygon = new L.polygon([]).addTo(map);
    map.on('click', addLatLngToPolygon); //Listen for clicks on map.
});
stopDraw.addEventListener('click', function(){
    map.off('click', addLatLngToPolygon); //Stop listening for clicks on map.
});
function addLatLngToPolygon(clickEventData){
    currentPolygon.addLatLng(clickEventData.latlng);
}


//dessiner un cercle
var drawCircleButton = document.getElementById('drawCircle');
var currentCircle = {}; //Empty object to be used later;

drawCircleButton.addEventListener('click', function(){
    map.on('click', addLatLngToCircle); //Listen for clicks on map.
});

function addLatLngToCircle(clickEventData){
        console.log(clickEventData);
        console.log(clickEventData.latlng.lat)
        var circle = L.circle([clickEventData.latlng.lat, clickEventData.latlng.lng], 500000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(map);
    

}
// deesiner une ligne
var drawPolylineButton = document.getElementById('drawPolyline');
var currentPolyline = {}; //Empty object to be used later;

drawPolylineButton.addEventListener('click', function(){
    currentPolyline = new L.polyline([]).addTo(map);
    map.on('click', addLatLngToPolyline); //Listen for clicks on map.
});
stopDrawPolyline.addEventListener('click', function(){
    map.off('click', addLatLngToPolyline); //Stop listening for clicks on map.
});

function addLatLngToPolyline(clickEventData){
        console.log(clickEventData);
        console.log(clickEventData.latlng.lat)
        currentPolyline.addLatLng(clickEventData.latlng);
    

}*/