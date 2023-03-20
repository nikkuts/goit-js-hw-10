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
    }
    fetchCountries(seachQuery);
};

function renderList (countries) {
    const marcup = countries.map(({flags, name}) => {
        const flag = flags.svg;
        const country = name.official;
       `
        <li>
        <img src=${flag} alt='${country} flag'/>
        <p>${country}</p>
        </li>
        `;
    })
    .join('');
    ref.list.innerHTML = marcup;
};

function renderInfo ({flags, name, capital, population, languages}) {
    const flag = flags.svg;
    const country = name.official;
    const language = '...languages';
    const marcup = 
        `
        <div>
        <img src=${flag} alt='country flag'/>
        <p>${country}</p>
        </div>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${language}</p>
        `;
    ref.info.innerHTML = marcup;
};