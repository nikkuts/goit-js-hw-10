// const fetchCountries = (name) => 
//      fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
//     .then((response) => response.json())
//     .then((data) => {
//         if(data.length > 10) { 
//             Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
//         } 
//         else if (data.length > 1) {
//             renderList(data);
//         } 
//         else {
//             renderInfo(data);
//         }  
//     })
//     .catch((error) => {
//         Notiflix.Notify.failure("Oops, there is no country with that name");
//     });

const fetchCountries = (name) => 
   fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
   .then((response) => response.json())
   .then((data) => data)
   .catch((error) => error);

export {fetchCountries};