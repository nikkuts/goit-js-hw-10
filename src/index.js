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
    ref.list.innerHTML = '';
    ref.info.innerHTML = '';
    const seachQuery = ref.text.value.trim();

    if (!seachQuery) {
        return;
    }
    fetchCountries(seachQuery)
    .then((data) => {
        if (data.length > 10) { 
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            return;
        } 
        if (data.length > 1 && data.length <= 10) { 
           renderList (data);
           return; 
        }
        renderInfo (data[0]); 
    })
    .catch((error) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    });
};

function renderList (countries) {
    countries.map(({flags, name}) => {
        const marcupList =
       `
        <li class="item">
        <img src=${flags.svg} alt='flag of ${name.official}' width=30px />
        <span>${name.official}</span>
        </li>
        `;
       return ref.list.insertAdjacentHTML('beforeend', marcupList);
    })
    .join('');
};

function renderInfo ({flags, name, capital, population, languages}) {
    const marcupInfo = 
        `
        <div class="name">
        <img src=${flags.svg} alt='flag of ${name.official}' width=50px />
        <span>${name.official}</span>
        </div>
        <p><span class="info">Capital:</span> ${capital}</p>
        <p><span class="info">Population:</span> ${population}</p>
        <p><span class="info">Languages:</span> ${Object.values(languages)}</p>
        `;
    ref.info.insertAdjacentHTML('beforeend', marcupInfo);
};