'use strict';

document.addEventListener('DOMContentLoaded', function() {

    var mymap = L.map('mapid').setView([43.3046818705083, 5.3901483781149], 13);
    var marker;
    var links;
    var drop = document.querySelector('#informations');
    var change = true;

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function getStations(data) {
        links = data;
    
        console.log(links);
    
        for (let i = 0; i< links.length; i++) {
            
            let infos = `Nom : ${links[i].name} <br>
            Adresse : ${capitalizeFirstLetter(links[i].address.toLowerCase())}<br>
            Vélos disponibles : ${links[i].available_bikes}<br>
            Places vides : ${links[i].available_bike_stands}<br>
            `;

            marker = new L.marker([links[i].position.lat, links[i].position.lng])
            .bindPopup(infos)
            .addTo(mymap);
        }
    
    }

    $.get (
        'https://api.jcdecaux.com/vls/v1/stations?contract=marseille&apiKey=245260d9956c7dfc616c84b830f7b6021f29807e',
        getStations
    )

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibGVjYWx1MTMiLCJhIjoiY2s2czI1a2RsMGI3eTNtcGd2ejllMGNiOCJ9.xJzoF3MXOYPR9LFIS8vP-g'
    }).addTo(mymap);

    drop.addEventListener('click', function() {
        
        if (change == true) {

            $('#informations').css('top', 0);
            change = false;
        }
        else {

            $('#informations').css('top', "-32.6rem");
            change= true;
        }

    })
});