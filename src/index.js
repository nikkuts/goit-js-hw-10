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
        return 
        `
        <li>
        <img src=${flags.svg} alt='country flag'/>
        <p>${name.official}</p>
        </li>
        `;
    })
    .join('');

    ref.list.innerHTML = marcup;
};

function renderDescription (country) {
    console.log(country);
};