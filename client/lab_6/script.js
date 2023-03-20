/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
function injectHTML(list){
  console.log('fired injectHTML')
  const target = document.querySelector('#restaurant_list');
  target.innerHTML = '';
  list.forEach((item, index) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str
  })
}

/* A quick filter that will return something based on a matching input */
function filterList(list, query) {
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery);


  })
}

function cutRestaurantList(){
  console.log('fired cut list');
  const range = [...Array(15).keys()];
  return newArray = range.map((item, index) => {
    const index = getRandomIntInclusive(0, list.length -1);
    return list [index]
  })
}

async function mainEvent() { // the async keyword means we can make API requests
  const mainForm = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector('#filter');
  const loadDataButton = document.querySelector('#data_load');
  const generateListButton = document.querySelector('#generate');
  const loadAnimation = document.querySelector('#data_load_animation');

  loadAnimation.style.display = 'none';

  let currentList = []; // this is "scoped" to the main event function
  
  /* We need to listen to an "event" to have something happen in our page - here we're listening for a "submit" */
  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" somethin    
    console.log('Loading data'); // this is substituting for a "breakpoint" - it prints to the browser to tell us we successfully submitted the form
    loadAnimation.style.display = 'inline_block';

    // Basic GET request - this replaces the form Action
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');

    // This changes the response from the GET into data we can use - an "object"
    currentList = await results.json();
    loadAnimation.style.display = 'none';

    console.table(currentList);

   
  });


  filterDataButton.addEventListener('click' , (event) => {
    console.log('clicked FilterButton');
    
    const FormData = new FormData(mainForm);
    const FormProps = Object.fromEntries(formData);

    console.log(FormProps);
    const newList = new filterList(currentList, formProps.resto);

    console.log(newList);
  })
  
  generateListButton.addEventListener('click', (event) => {
    console.log('generate new list');
    const restaurantsList = cutRestaurantList(currentList);
    console.log(restaurantsList)
    injectHTML(restaurantsList);
  })
}

/*
  This adds an event listener that fires our main event only once our page elements have loaded
  The use of the async keyword means we can "await" events before continuing in our scripts
  In this case, we load some data when the form has submitted
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests