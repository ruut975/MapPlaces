import places from '../../../public/places.json';

const placesList = places.places;
const placesListEl = document.getElementById('placesList');

placesList.forEach(place => {
const html = `<li class="placesListItem"><h1>${place.name}</h1><p>${place.description}</p></li>`
  placesListEl.innerHTML += html;
});