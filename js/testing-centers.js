// === CONFIG ===
const TUP_MANILA = { lat: 14.5869, lng: 120.9860 }; // TUP – Manila coordinates
const SEARCH_RADIUS_KM = 5; // radius for filtering

// HIV Testing Centers (real Manila examples + you can add more)
const testingCenters = [
    { name: "LoveYourself Uni", lat: 14.5441, lng: 121.0137 },
    { name: "RITM Satellite Clinic", lat: 14.5690, lng: 121.0202 },
    { name: "Project Red Ribbon Care Management", lat: 14.5764, lng: 121.0583 },
    { name: "San Lazaro Hospital HIV Clinic", lat: 14.6135, lng: 120.9834 },
    { name: "LoveYourself Anglo", lat: 14.5666, lng: 121.0362 }
];

// === Initialize map centered at TUP-Manila ===
var map = L.map('map').setView([TUP_MANILA.lat, TUP_MANILA.lng], 14);

// Tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

// Mark TUP-Manila
L.marker([TUP_MANILA.lat, TUP_MANILA.lng])
    .addTo(map)
    .bindPopup("TUP – Manila (Center Point)")
    .openPopup();

// === Distance formula (Haversine) ===
function distanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// === Filter centers within radius ===
function showNearbyCenters() {
    let listHTML = "<h3>Testing Centers within " + SEARCH_RADIUS_KM + " km</h3><ul>";

    testingCenters.forEach(center => {
        const dist = distanceKm(TUP_MANILA.lat, TUP_MANILA.lng, center.lat, center.lng);

        if (dist <= SEARCH_RADIUS_KM) {
            // place marker
            L.marker([center.lat, center.lng])
                .addTo(map)
                .bindPopup(`${center.name}<br>Distance: ${dist.toFixed(2)} km`);

            listHTML += `<li><strong>${center.name}</strong> — ${dist.toFixed(2)} km</li>`;
        }
    });

    listHTML += "</ul>";

    document.getElementById("centerList").innerHTML = listHTML;
}

// Show filtered results
showNearbyCenters();
