import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from "../node_modules/notiflix/build/notiflix-notify-aio";
import {fetchCountries} from "./fetchCountries";

const DEBOUNCE_DELAY = 300;
const ref = {
    text: document.querySelector('input#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

ref.text.addEventListener("input", debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry (event) {
    const seachQuery = ref.text.value.trim();

    if(!seachQuery) {
        return;
    } else {
    fetchCountries(seachQuery)
    .then((data) => {
        if(data.length > 10) { 
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } 
        else if (data.length > 1) {
            renderList(data);
        } 
        else {
            renderInfo(data);
        }  
    })
    .catch((error) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    });
    };
};

function renderList (countries) {
    const marcupList = countries.map(({flags, name}) => {
       `
        <li>
        <img src=${flags.svg} alt='flag of ${name.official}'/>
        <p>${name.official}</p>
        </li>
        `;
    })
    .join('');
    ref.list.innerHTML = marcupList;
};

function renderInfo ({flags, name, capital, population, ...languages}) {
    const marcupInfo = 
        `
        <div>
        <img src=${flags.svg} alt='flag of ${name.official}'/>
        <p>${name.official}</p>
        </div>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${languages}</p>
        `;
    ref.info.innerHTML = marcupInfo;
};