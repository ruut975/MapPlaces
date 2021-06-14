import * as UI from './UI';

const centerCoords = { lat: 65.01236, lng: 25.46816 };
const mapDiv = document.getElementById("map");

const mapConfig = {
  // Map options
  options: {
    center: centerCoords,
    zoom: 11,
    disableDefaultUI: true,
    // zoomControl: true,
  },
};

let map = undefined;
let placedMarker = null;
let markerCoords;

export const initMap = () => {
  // New Google Map
  map = new google.maps.Map(mapDiv, mapConfig.options);
};

 let savedMarkers = [];

const addMarker = (position) => { 
  hideUnsavedMarker()
  placedMarker = new google.maps.Marker({
    position: position,
    map: map
  });
};

const hideUnsavedMarker = () => {
  // if unsaved marker exists and has a .setMap method, hide it
  if (placedMarker && placedMarker.setMap) {
    placedMarker.setMap(null);
  }
}

const saveCoords = (coords) => {
  markerCoords = coords;
  console.log(markerCoords);
};

const centerMapToCoords = (coords) => {
  map.panTo(coords);
};

export const onMapClick = () => {
  google.maps.event.addListener(map, "click", (event) => {
    const position = event.latLng
    const lat = event.latLng.lat().toFixed(6);
    const lng = event.latLng.lng().toFixed(6);
    addMarker(position)
    UI.hideUIControls()
    UI.showAddPlaceButton()
    saveCoords({ lat: lat, lng: lng });
    centerMapToCoords(event.latLng)
  })
};

export const renderAllPlacesMarkers = (places) => {
  console.log(places);
  if (Array.isArray(places)) {
    places.forEach((place) => {
      const markerLocation = { lat: place.markerLocation.lat, lng: place.markerLocation.lng }
      console.log(markerLocation);
      const marker = new google.maps.Marker({
        position: markerLocation,
        map: map
      });
      savedMarkers.push(marker);
    });
  } else {
    throw new Error("loadMarkers: provided argument is not an array");
  }
};

export const onZoomChange = () => {
  google.maps.event.addListener(map, "zoom_changed", () => {
    UI.hideUIControls()
    placedMarker && removeUnsavedMarker(placedMarker);
  });
};

export const onMapDragend = () => {
  google.maps.event.addListener(map, "dragend", () => {
    UI.hideUIControls()
    placedMarker && removeUnsavedMarker(placedMarker);
  });
};

const removeUnsavedMarker = (marker) => {
  marker.setMap(null);
};


