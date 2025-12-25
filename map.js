// Alap térkép
const map = L.map('map').setView([47.2, 19.5], 8);

// OpenStreetMap réteg
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

// PMR ikon (opcionális)
const pmrIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [28, 28]
});

// JSON betöltése
fetch('pmr_papagajok.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {

            // Lokátorból koordináta
            const coords = locatorToLatLng(item.locator);

            // Hangolás mező összeállítása
            let tone = "-";
            if (item.ctcss_hz) {
                tone = item.ctcss_hz + " Hz";
                if (item.ctcss_code) tone += " (" + item.ctcss_code + ")";
            } else if (item.dcs) {
                tone = item.dcs;
            }

            // Popup HTML
            const popupHtml = `
                <b>${item.name}</b><br>
                QTH: ${item.locator}<br>
                Csatorna: PMR ${item.channel}<br>
                Frekvencia: ${item.freq_mhz} MHz<br>
                Hangolás: ${tone}<br>
                Megjegyzés: ${item.notes || "-"}
            `;

            // Marker
            L.marker([coords.lat, coords.lng], { icon: pmrIcon })
                .addTo(map)
                .bindPopup(popupHtml);
        });
    });
