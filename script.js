


const INITIAL_CENTER = [-73.938675,40.819872]
	mapboxgl.accessToken = 'pk.eyJ1IjoidnRzbCIsImEiOiJjbGRsaGZoaG0wMXJ4M29udzdrMGZnZWlxIn0.UvCR8AGz6Go4hXJty00x-A';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v11',
        projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
        zoom: 10,
        center: [INITIAL_CENTER[0],INITIAL_CENTER[1]]
    });

    map.on('style.load', () => {
        // map.setFog({}); // Set the default atmosphere style


        //add json data
        map.addSource('nyc',
        {
            type: 'geojson',
            data:'data/nyc.geojson'

        })
    //     map.addLayer({
    //     id:'nyc-fill',
    //     type: 'fill',
    //     source: 'nyc',
    //     paint:{
    //         'fill-color': 'orange'
    //     }

    // })  
    map.addLayer({
        id:'nyc-fill-diff',
        type: 'fill',
        source: 'nyc',
        paint:{
            'fill-color': [
                'match',
                ['get','boro_code'],
                1,
                'green',
                2,
                'blue',
                3,
                'purple',
                4,
                'burlywood',
                'steelblue'
            ]
        },
        
    },
    "road-label"
    )  
    map.on('click',(e) =>{
        console.log('click',e.point)
        const [features] = map.queryRenderedFeatures(e.point, {
        layers: ['nyc-fill-diff']
});
    if(features)
    {
        const {boro_name,pop2020}= features.properties
        alert(boro_name+" "+pop2020)
    }
    }

    )
    });
    document.querySelector('#flyToConey').addEventListener('click',() =>
    {
        console.log('click');
        map.flyTo({
            center:[86.9250,27.9881],
            zoom:11
        })
    })
    document.querySelector('#reset').addEventListener('click',() =>
    {
        console.log('reset')
        map.flyTo({
            center:INITIAL_CENTER,
            zoom:11
        })
    })
   
//     const marker1 = new mapboxgl.Marker()
// .setLngLat([78.337270,17.491876])
// .addTo(map);
const locations= [
    {
        name:"Home",
        color:'#00425A',
        lnglat:[78.337270,17.491876]
    },
    {
        name:"Office",
        color:'#1F8A70',
        lnglat:[78.344130,17.418669]
    },
    {
        name:"Hostel",
        color:'#BFDB38',
        lnglat:[78.349888,17.418717]
    }
    
]
locations.forEach(({name, color ,lnglat}) =>{
    const popup = new mapboxgl.Popup({offset: 25}).setText(name) ;
        new mapboxgl.Marker({color})
        .setLngLat(lnglat)
        .setPopup(popup)
        .addTo(map);
})

   
    let userInteracting = true;
    
        map.on('style.load', () => {
    map.addSource('mapbox-dem', {
    'type': 'raster-dem',
    'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    'tileSize': 512,
    'maxzoom': 14
    });
    // add the DEM source as a terrain layer with exaggerated height
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1 });
    });

   map.on('style.load', () => {
// Insert the layer beneath any symbol layer.
const layers = map.getStyle().layers;
const labelLayerId = layers.find(
(layer) => layer.type === 'symbol' && layer.layout['text-field']
).id;
 
// The 'building' layer in the Mapbox Streets
// vector tileset contains building height data
// from OpenStreetMap.
map.addLayer(
{
'id': 'add-3d-buildings',
'source': 'composite',
'source-layer': 'building',
'filter': ['==', 'extrude', 'true'],
'type': 'fill-extrusion',
'minzoom': 15,
'paint': {
'fill-extrusion-color': '#aaa',
 
// Use an 'interpolate' expression to
// add a smooth transition effect to
// the buildings as the user zooms in.
'fill-extrusion-height': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'height']
],
'fill-extrusion-base': [
'interpolate',
['linear'],
['zoom'],
15,
0,
15.05,
['get', 'min_height']
],
'fill-extrusion-opacity': 0.6
}
},
labelLayerId
);


});

//add json data


