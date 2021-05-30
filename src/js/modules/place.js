import axios from "axios";

const place = {};
let url = "";

export const loadPlace = (id, element) => {
  url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  axios
    .get(url)
    .then((response) => {
      renderPlace(response.data, element);
    })
    .catch((error) => console.log(error));
};

const renderPlace = (place, element) => {
  let htmlPlaceTemplate;
  if (place) {
    const title = place.title;
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
         <button class="place__favorite-button place__favorite-button--selected">
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
     <p>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
       Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br><br>
       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
       Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
     </p>
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
