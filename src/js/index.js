import "sanitize.css";
import * as Map from "./modules/map";
import * as Places from "./modules/places";
import {
  loadPlace
} from './modules/place';
// import places from "../../../public/places.json";

const places = [
  {
    id: 1,
    name: "Oulu",
    description: "Capital of Northern Finland",
    coords: {"lat": 65.01236, "lng": 25.46816},
    hours: {"from": "07:00", "to": "18:00"},
    category: "City",
    favorite: true
  },
  {
    id: 2,
    name: "Helsinki",
    description: "Capital of Finland",
    coords: {"lat": 60.1699, "lng": 24.9384},
    hours: {"from": "07:00", "to": "18:00"},
    category: "Capital City",
    favorite: true
  },
  {
    id: 3,
    name: "Naantali",
    description: "Sunniest city in Finland",
    coords: {"lat": 60.4661, "lng": 22.0251},
    hours: {"from": "07:00", "to": "16:00"},
    category: "Capital City",
    favorite: false
  }
]
// Map Controller

// initializing google map
Map.initMap();

Map.loadAllMarkers(Map.savedMarkers);
Map.addMarker();
Map.onZoomChange();
Map.onMapDragend();

//Places Controller

// Attaching event listeners

const addPlaceButton = document.querySelector(".add-place__button");
const filtersMenuButton = document.querySelector(".filters__menu-button");
const sideDrawerToggleButton = document.querySelector(".side-drawer__toggle-button");
const listItemTitle = document.querySelectorAll(".list-item__title");
const placeEditButton = document.querySelector(".place__edit-button");
const editPlaceCancelButton = document.querySelector(".edit-place__cancel-button");
const editPlaceRemoveButton = document.querySelector(".edit-place__remove-button");
const editPlaceSubmitButton = document.querySelector(".edit-place__submit-button");
const placeBackButton = document.querySelector(".place__back-button");
const placeFavoriteButton = document.querySelector(".place__favorite-button");

const sideDrawer = document.querySelector(".side-drawer");
const sideDrawerContentPlaces = document.querySelector(".side-drawer__places");
const sideDrawerContentFullPlace = document.querySelector(".side-drawer__full-place");
const addPlace = document.querySelector(".add-place");
const editPlaceSection = document.querySelector(".edit-place");
const categories = document.querySelector(".categories");
const search = document.querySelector(".search");

addPlaceButton.addEventListener('click', () => {
  editPlaceSection.classList.add('edit-place--show');
  search.classList.add('search--hide');
  editPlaceRemoveButton.classList.add('edit-place__remove-button--hide');
})

filtersMenuButton.addEventListener('click', () => {
  categories.classList.toggle('categories--show');
})

sideDrawerToggleButton.addEventListener('click', () => {
  sideDrawer.classList.toggle('side-drawer--show');
  sideDrawerContentPlaces.classList.toggle('side-drawer__places--show');
  sideDrawerContentFullPlace.classList.remove('side-drawer__full-place--show');
  addPlace.classList.remove('add-place--show');
})

listItemTitle.forEach(title => {
  title.addEventListener('click', () => {
    sideDrawerContentPlaces.classList.toggle('side-drawer__places--show');
    sideDrawerContentFullPlace.classList.toggle('side-drawer__full-place--show');
    addPlace.classList.remove('add-place--show');
  })
})

placeEditButton.addEventListener('click', () => {
  editPlaceSection.classList.toggle('edit-place--show');
  sideDrawer.classList.remove('side-drawer--show');
  addPlace.classList.remove('add-place--show');
  search.classList.toggle('search--hide');
  editPlaceRemoveButton.classList.remove('edit-place__remove-button--hide');
})

editPlaceSubmitButton.addEventListener('click', () => {
  editPlaceSection.classList.remove('edit-place--show');
  sideDrawer.classList.remove('side-drawer--show');
  addPlace.classList.remove('add-place--show');
  search.classList.toggle('search--hide');
})

editPlaceCancelButton.addEventListener('click', () => {
  editPlaceSection.classList.remove('edit-place--show');
  sideDrawer.classList.remove('side-drawer--show');
  addPlace.classList.remove('add-place--show');
  search.classList.toggle('search--hide');
})

editPlaceRemoveButton.addEventListener('click', () => {
  confirm('Are you sure you want to remove item permanently?')
})

placeBackButton.addEventListener('click', () => {
  sideDrawerContentFullPlace.classList.remove('side-drawer__full-place--show');
  sideDrawerContentPlaces.classList.toggle('side-drawer__places--show');
})

placeFavoriteButton.addEventListener('click', () => {
  placeFavoriteButton.classList.toggle('place__favorite-button--selected');
})

const searchBox = document.getElementsByClassName("searchBox");
const placesList = document.getElementsByClassName("places");
const toggleList = document.getElementsByClassName("toggle_places");

// //show places list when clicking search box
// searchBox.addEventListener("focus", () => {
//   Places.showPlacesList(placesList);
// });

// //hide places list when clicking toggleList button
// toggleList.addEventListener("click", () => {
//   Places.hidePlacesList(placesList);
// });

//render list of Places
const placesListEl = document.getElementsByClassName("places_list");

// Places.renderListOfPlaces(places, placesListEl);
