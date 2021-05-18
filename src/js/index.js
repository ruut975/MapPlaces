import "sanitize.css";
import * as Map from "./modules/map"
import "./modules/places"

const searchBox = document.getElementById("searchBox");
const placesList = document.getElementById("places");
const toggleList = document.getElementById("toggleList");

searchBox.addEventListener("focus", () => {
  placesList.classList.add("places--show");
});

toggleList.addEventListener("click", () => {
  placesList.classList.remove("places--show");
});

// initializing google map
Map.initMap()
console.log('initMap');
Map.addMarker();
Map.onZoomChange();


