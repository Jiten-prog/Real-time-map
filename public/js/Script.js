const socket= io();
const markers={};
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{const{latitude, longitude}=position.coords;
socket.emit("send-location", {latitude, longitude}); // finds the current location in latitude and longitude and sends in backend
},(error)=>{
    console.error(error) //if error comes it will be console logged
},
{
    enableHighAccuracy:true, // some settings of watch position
    maximumAge:0, // no saved data it will ask for new data
    timeout:5000
}
)
}

const map =L.map("map").setView([0,0], 10) ; //initial position must be set to 0 latitude and longitude
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //code to get the map from leaflet
    maxZoom: 19, //this is the zoom
}).addTo(map); // we have to add this data of map and zoom to map

socket.on("receive-location", (data)=>{const{id, latitude,longitude}=data; // code to get automatic location currently it doesnt show the marker but it shows the correct place
map.setView([latitude, longitude]);// code to update the location from 0 to current
if (markers[id]){ //creating the marker of location
    markers[id].setLatLang([latitude, longitude]);
} else{
    markers[id]=L.marker([latitude, longitude]).addTo(map);
}

});