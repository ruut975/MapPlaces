export const showPlacesList = (element) => {
  element.classList.add("places--show");
};

export const hidePlacesList = (element) => {
  element.classList.remove("places--show");
};

export const renderListOfPlaces = (places, outputDiv) => {
  places.forEach((place) => {
    const html = `<li class="placesListItem"><h1>${place.name}</h1><p>${place.description}</p></li>`;
    outputDiv.innerHTML += html;
  });
};
