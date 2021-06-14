
export const showAddPlaceButton = () => {
  const addPlace = document.querySelector(".add-place");
  addPlace.classList.add('add-place--show');
}

export const hideUIControls = () => {
  const addPlace = document.querySelector(".add-place");
  const sideDrawer = document.querySelector(".side-drawer");
  sideDrawer.classList.remove('side-drawer--show');
  addPlace.classList.remove('add-place--show');
}