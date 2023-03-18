import './css/styles.css';
import debounce from 'lodash.debounce';
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