import axios from "axios";
import { attachFullPlaceViewListeners } from '../app'


export const showFullPlace = (id, baseUrl ,element) => {
  loadPlace(id, baseUrl).then((fetchedPlace) => {
    renderPlace(fetchedPlace, element);
    attachFullPlaceViewListeners()
  })
}

export const addPlace = (formElement) => {
sendFormData(formElement);
}

const sendFormData = (form) => {
  form.onsubmit = async (e) => {
    e.preventDefault();

    let response = await axios({
      method: 'post',
      url: url,
      data: new FormData(form)
    })

    let result = await response.json();

    alert(result.message);
  };
}

const loadPlace = async (id, baseUrl) => {
  const url = `${baseUrl}/${id}`;
  try {
    let response = await axios
    .get(url);
    if(response.status == 200) {
      return response.data;
    }     
  } 
  catch (error) {
    console.log(error);
  }
};

const renderPlace = (place, element) => {
  let htmlPlaceTemplate;
  if (place) {
    const title = place.title;
    const description = place.description;
    let favoriteIconClassList = ["place__favorite-button"];
      if (place.favorite == true) {
        favoriteIconClassList.push("place__favorite-button--selected");
      }
    htmlPlaceTemplate = `
     <div class="place">
     <div class="place__back">
       <button class="place__back-button">
         <svg
           width="18" 
           height="18" 
           viewBox="0 0 24 24">
           <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>
         </svg>
       </button>
     </div>
     <div class="flex-container">
       <h1 class="place__title">${title}</h1>
       <div class="place__favorite">
         <button class="${favoriteIconClassList.join(' ')}">
           <svg
             width="18" 
             height="18" 
             viewBox="0 0 24 24">
             <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
           </svg>
         </button>
       </div>
     </div>
     <div class="place__opening-hours">Open 7:00 - 16:00</div>
     <p>${description}</p>
     <button class="place__edit-button">Edit</button>
   </div> `;
  } else {
    throw new Error("renderPlace: first argument missing");
  }
  if (element) {
    element.innerHTML = htmlPlaceTemplate;
  } else {
    throw new Error(
      "renderPlace: couldn't render place, second argument missing"
    );
  }
};
