import * as Places from "./modules/places";
import * as Map from "./modules/map";
import * as Place from "./modules/place";

const apiUrl = "https://us-central1-map-places-311d1.cloudfunctions.net/places"

// loading places
const places = await Places.loadPlaces(apiUrl)
console.log(places);

// Map Controller

// initialize google map
Map.initMap();

// render markers
Map.renderAllPlacesMarkers(places);

// attache map event handlers
Map.onMapClick();
Map.onZoomChange();
Map.onMapDragend();

//Places Controller

// Attaching event listeners

const sideDrawer = document.querySelector(".side-drawer");

const sideDrawerContent = document.querySelector(".side-drawer__content");
const sideDrawerContentFullPlace = document.querySelector(
  ".side-drawer__content--full-place"
);
const placesList = document.querySelector(".places__list");

const addElementClass = (element, className) => {
  if (element) {
    if (className) {
      element.classList.add(className);
    } else {
      throw new Error("addElementClass: second argument missing");
    }
  } else {
    throw new Error("addElementClass: first argument missing");
  }
};

const removeElementClass = (element, className) => {
  if (element) {
    if (className) {
      element.classList.remove(className);
    } else {
      throw new Error(
        "removeElementClass: second argument missing"
      );
    }
  } else {
    throw new Error("removeElementClass: first argument missing");
  }
};

const addPlaceButton = document.querySelector(".add-place__button");
const filtersMenuButton = document.querySelector(".filters__menu-button");
const sideDrawerToggleButton = document.querySelector(
  ".side-drawer__toggle-button"
);
const editPlaceCancelButton = document.querySelector(
  ".edit-place__cancel-button"
);
const editPlaceRemoveButton = document.querySelector(
  ".edit-place__remove-button"
);
const editPlaceSubmitButton = document.querySelector(
  ".edit-place__submit-button"
);

// const sideDrawerContentPlaces = document.querySelector(".side-drawer__places");
// const sideDrawerContentFullPlace = document.querySelector(
//   ".side-drawer__full-place"
// );
const addPlace = document.querySelector(".add-place");
const editPlaceSection = document.querySelector(".edit-place");
const categories = document.querySelector(".categories");
const search = document.querySelector(".search");

addPlaceButton.addEventListener("click", () => {
  editPlaceSection.classList.add("edit-place--show");
  search.classList.add("search--hide");
  editPlaceRemoveButton.classList.add("edit-place__remove-button--hide");
});

filtersMenuButton.addEventListener("click", () => {
  categories.classList.toggle("categories--show");
});

sideDrawerToggleButton.addEventListener("click", () => {
  sideDrawer.classList.toggle("side-drawer--show");
  sideDrawerContent.classList.toggle("side-drawer__content--show-places");
  addPlace.classList.remove("add-place--show");
});

const attachPlacesViewListeners = () => {
  const listItems = document.querySelectorAll(".places__list-item");

  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const listItemId = e.target.parentElement.parentElement.id
      if (e.target.attributes?.class?.value == "list-item__title") {
        Place.showFullPlace(listItemId, apiUrl, sideDrawerContentFullPlace);
        sideDrawerContentFullPlace.classList.toggle(
          "side-drawer__content--show-full-place"
        );
        addPlace.classList.remove("add-place--show");
      }
    })
  })
};

Places.renderPlaces(places, placesList)
attachPlacesViewListeners();

// Places.showPlaces(placesList, places);

export const attachFullPlaceViewListeners = () => {
  const placeBackButton = document.querySelector(".place__back-button");
  const placeFavoriteButton = document.querySelector(".place__favorite-button");
  const placeEditButton = document.querySelector(".place__edit-button");

  placeBackButton.addEventListener("click", () => {
    sideDrawerContentFullPlace.classList.remove(
      "side-drawer__content--show-full-place"
    );
  });

  placeFavoriteButton.addEventListener("click", () => {
    placeFavoriteButton.classList.toggle("place__favorite-button--selected");
  });

  placeEditButton.addEventListener("click", () => {
    editPlaceSection.classList.toggle("edit-place--show");
    removeElementClass(sideDrawer, "side-drawer--show");
    addPlace.classList.remove("add-place--show");
    search.classList.toggle("search--hide");
    editPlaceRemoveButton.classList.remove("edit-place__remove-button--hide");
  });
};

editPlaceSubmitButton.addEventListener("click", () => {
  const form = document.querySelector('edit-place__form');
  console.log(form);
  Place.addPlace(form);
  editPlaceSection.classList.remove("edit-place--show");
  sideDrawer.classList.remove("side-drawer--show");
  addPlace.classList.remove("add-place--show");
  search.classList.toggle("search--hide");
});

editPlaceCancelButton.addEventListener("click", () => {
  editPlaceSection.classList.remove("edit-place--show");
  sideDrawer.classList.remove("side-drawer--show");
  addPlace.classList.remove("add-place--show");
  search.classList.toggle("search--hide");
});

editPlaceRemoveButton.addEventListener("click", () => {
  confirm("Are you sure you want to remove item permanently?");
});

const searchBox = document.getElementsByClassName("searchBox");
// const placesList = document.getElementsByClassName("places");
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
// const placesListEl = document.getElementsByClassName("places_list");

// Places.renderListOfPlaces(places, placesListEl);
