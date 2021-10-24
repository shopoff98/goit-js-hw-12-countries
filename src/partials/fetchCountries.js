export default function fetchCountry(countryName) {
    const BASE_URL = 'https://restcountries.com/v2/name';
    return fetch(`${BASE_URL}/${countryName}`).then(response =>
        response.json());
}


