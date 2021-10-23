// import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import listCountriesTempl from './templates/listCountriesTempl.hbs';
import createCountryCard from './templates/createCountryCard.hbs';

const BASE_URL = 'https://restcountries.com/v2/name';
const { error } = require('@pnotify/core');
const debounce = require('lodash.debounce');



const inputRefs = document.querySelector('#js-search');
const ulRefs = document.querySelector('.js-country-list');



inputRefs.addEventListener('input', debounce(fetchCountries, 500));

function fetchCountries(e) {
        e.preventDefault();
        const nameCountry = e.target.value;
        const url = `${BASE_URL}/${nameCountry}`;
        fetch(url).then(response => response.json()).then(data => filterCountries(data)
        )};

    


function filterCountries(data) {
        if (data.length > 10) {
                error({
                        text: "Too many matches found. Please enter a more specific query!"
                })
        }

        if (inputRefs.value === '') {
                ulRefs.innerHTML = '';
        }
        
        if (data.length > 1 && data.length < 11) {
             return   ulRefs.innerHTML = listCountriesTempl(data);
        }
       if (data.length === 1) {
                return ulRefs.innerHTML = createCountryCard(data);
        }
      
        if (data.status === 404) {
                error({
                        text: "No country has been found. Please enter a more specific query!"
                })
        };
        
    
    
}


