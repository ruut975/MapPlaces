
const mapDiv = document.getElementById("map");
let map;
const centerCoords = { lat: 65.01236, lng: 25.46816 };
const mapConfig = {
  // Map options
  options: {
    center: centerCoords,
    zoom: 11,
    disableDefaultUI: true,
    // zoomControl: true,
  },
};
let placedMarker = null;
let markerCoords;
export const savedMarkers = [
  { lat: 60.4661, lng: 22.0251 },
  { lat: 60.1699, lng: 24.9384 },
  { lat: 65.01236, lng: 25.46816 },
];

export const initMap = () => {
  // New Google Map
  map = new google.maps.Map(mapDiv, mapConfig.options);
};

const showAddPlaceButton = () => {
  const addPlace = document.querySelector(".add-place");
  addPlace.classList.add('add-place--show');
}

const hideAddPlaceButton = () => {
  const addPlace = document.querySelector(".add-place");
  addPlace.classList.remove('add-place--show');
}

export const addMarker = () => {
  google.maps.event.addListener(map, "click", (event) => {
    showAddPlaceButton()
    const lat = event.latLng.lat().toFixed(6);
    const lng = event.latLng.lng().toFixed(6);
    saveCoords({ lat: lat, lng: lng });
    // if marker exists and has a .setMap method, hide it
    if (placedMarker && placedMarker.setMap) {
      placedMarker.setMap(null);
    }
    placedMarker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      draggable: true,
      title: "Drag me!",
    });
    // map.panTo(event.latLng);
  });
};

const saveCoords = (coords) => {
  markerCoords = coords;
  console.log(markerCoords);
};

export const loadAllMarkers = (listOfMarkerPositions) => {
  if (Array.isArray(listOfMarkerPositions)) {
    listOfMarkerPositions.forEach((pos) => {
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
      });
    });
  } else {
    throw new Error("loadMarkers: provided argument is not an array");
  }
};

export const onZoomChange = () => {
  google.maps.event.addListener(map, "zoom_changed", () => {
    hideAddPlaceButton()
    placedMarker && removeUnsavedMarker(placedMarker);
  });
};

export const onMapDragend = () => {
  google.maps.event.addListener(map, "dragend", () => {
    hideAddPlaceButton()
    placedMarker && removeUnsavedMarker(placedMarker);
  });
};

const removeUnsavedMarker = (marker) => {
  marker.setMap(null);
};
