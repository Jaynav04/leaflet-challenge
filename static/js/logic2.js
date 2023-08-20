//Creating the Base map
let myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
  });

//Adding in the Base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//URL containing GeoJSON data from earthquakes in the past 7 days
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Reading in the data and running the function
d3.json(url).then(function(response) {

    console.log(response);
    features = response.features;
    console.log(features)

    // let coordinatesArray = []
    //  let depthArray = []
    // let magnitudeArray = []

     for (let i = 0; i < features.length; i++) {
         let location = features[i].geometry;
         let magnitude = features[i].properties
        

        let color = "";
         if (location.coordinates[2] <= 0) {
            color = "#b0c4d8";
          }
        else if (location.coordinates[2] <= 10) {
            color = "#8d9fb7";
          }
        else if (location.coordinates[2] <= 20) {
            color = "#5b6da6";
          }
        else if (location.coordinates[2] <= 40) {
            color = "#3956df";
          }
        else if (location.coordinates[2] <= 60) {
            color = "#1d3bef";
          }
        else if (location.coordinates[2] <= 80 ){
            color = "#0010d9";
          }
        else {
            color = "#black"
        }

        //Adding in the circle markers containing location/color/radius conditions as well as a bindpop for each
        L.circleMarker([location.coordinates[1], location.coordinates[0]], {
            fillOpacity: 0.90,
            fillColor: color,
            color:"white",
            // Adjust the radius.
            radius: (magnitude.mag)*5 
          }).bindPopup(`<h3>${magnitude.title}</h3><hr><p>${new Date(magnitude.time)}</p>`).addTo(myMap);

        
    }

    //Adding in a legend containing the color depth condition of each circle marker
    var legend = L.control({ position: "bottomleft" });

    legend.onAdd = function(myMap) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Earthquake Depth</h4>";
        div.innerHTML += '<i style="background: #b0c4d8"></i><span>-10-0</span><br>';
        div.innerHTML += '<i style="background: #8d9fb7"></i><span>0-10</span><br>';
        div.innerHTML += '<i style="background: #5b6da6"></i><span>10-20</span><br>';
        div.innerHTML += '<i style="background: #3956df"></i><span>20-40</span><br>';
        div.innerHTML += '<i style="background: #1d3bef"></i><span>40-60</span><br>';
        div.innerHTML += '<i style="background: #0010d9"></i><span>60-80</span><br>';
        div.innerHTML += '<i style="background: #000000"></i><span>80+</span><br>';

        return div
    };
    legend.addTo(myMap)
});    

