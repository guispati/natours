export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ3Vpc3BhdGkiLCJhIjoiY2w4czE5NnR3MHMycjNwbnp3bXMzNWN0YiJ9.2COQDmtQDa6lxOLIkNIX1Q';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/guispati/cl8s1pzn8001u15pmwigcrpeu',
        scrollZoom: false,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        const el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom',
        }).setLngLat(loc.coordinates).addTo(map);

        new mapboxgl.Popup({
            offset: 30,
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);

        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100,
        }
    });
}