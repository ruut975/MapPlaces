import axios from "axios";
import { attachPlacesViewListeners } from '../app'

const url = "https://us-central1-map-places-311d1.cloudfunctions.net/places";

export const showPlaces = (element) => {
  loadPlaces().then((fetchedPlaces) => {
    renderPlaces(fetchedPlaces, element);
    attachPlacesViewListeners()
  })
}

const loadPlaces = async () => {
  try {
    let response = await axios
    .get(url);
    if(response.status == 200){
      return response.data;
    }  
    console.log(response)   
  } 
  catch (error) {
    console.log(error);
  }
};

const renderPlaces = (placesArray, element) => {
  let htmlPlaceTemplate;
  if (placesArray) {
    placesArray.forEach((place) => {
      const title = place.title;
      const description = place.description;
      htmlPlaceTemplate = `
      <li class="places__list-item" id="${place.id}">
      <div class="flex-container">
        <h1 class="list-item__title">${title}</h1>
        <div class="list-item__favorite-icon">
          <svg
            width="18" 
            height="18" 
            viewBox="0 0 24 24">
            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
          </svg>
        </div>
      </div>
      <div class="list-item__opening-hours">Open 7:00 - 16:00</div>
      <p>${description}</p>
    </li>
     `;
     element.innerHTML += htmlPlaceTemplate;
    });
  } else {
    throw new Error("renderPlaces: first argument missing");
  }
};

export const showSideDrawerContentPlaces = (element) => {
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
