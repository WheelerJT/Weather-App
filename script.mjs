import { apiKey } from "./key.mjs";

//Elements
const bodyWrapper = document.getElementById('bodyWrap');
const searchWrapper = document.getElementById('search-form-wrapper');
const titleWrapper = document.getElementById('title-wrapper');
const title = document.getElementById('title');
const clouds = document.getElementById('clouds');
const loadCircle = document.getElementById('loading-circle-wrapper');
const dropdownLoad = document.getElementById('dropdown-load-wrapper');
const searchBox = document.getElementById('location-search');
const searchButton = document.getElementById('search-button');
const docLoc = document.getElementById('location');
const docTemp = document.getElementById('temperature');
const docType = document.getElementById('weatherType');
const docFL = document.getElementById('feelsLike');
const docMin = document.getElementById('tempMin');
const docMax = document.getElementById('tempMax');
const docWS = document.getElementById('windSpeed');
const docHum = document.getElementById('humidity');
const docDrop = document.getElementById('dropdown');

//Variables
let time = new Date()
let hours = time.getHours();
let value;
let latLong;
let locationDisplayName;
const key = apiKey;

//Dynamic Background
if(hours >= 5 || hours >= 20) {
    document.body.style.background = 'url(images/stars-background.svg), linear-gradient(rgb(33, 62, 73), rgb(24, 42, 48), rgb(9, 15, 18))';
    titleWrapper.style.background = 'url(./images/moon.png)';
    titleWrapper.style.backgroundSize = 'cover';
    titleWrapper.style.color = 'rgb(5, 72, 140)'
    titleWrapper.style.width = '250px';
    titleWrapper.style.height = '250px';
    titleWrapper.style.margin = '130px auto'
    titleWrapper.style.marginBottom = '40px';
    clouds.style.display = 'none';
    bodyWrapper.style.background = 'rgba(255, 255, 255, 0.3)';

    document.getElementById('temperature').style.color = '#7cc8e6';
    document.getElementById('feelsLike').style.color = '#7cc8e6';
    document.getElementById('tempMin').style.color = '#7cc8e6';
    document.getElementById('tempMax').style.color = '#7cc8e6';
    document.getElementById('windSpeed').style.color = '#7cc8e6';
    document.getElementById('humidity').style.color = '#7cc8e6';
}

//Body Functions
function showBody() {
    bodyWrapper.style.display = 'block';
}

function hideBody() {
    bodyWrapper.style.display = 'none';
}

//Loading Functions
function showLoad() {
    loadCircle.style.display = 'block';
}

function hideLoad() {
    loadCircle.style.display = 'none';
}

function showDropdownLoad() {
    dropdownLoad.style.display = 'flex';
}

function hideDropdownLoad() {
    dropdownLoad.style.display = 'none';
}

hideBody();
hideDropdown();

//Search Box Functions
function lowerSearch() {
    searchWrapper.style.height = '50px';
    searchWrapper.style.padding= '';
    searchWrapper.style.backgroundColor = 'yellow'
}

function raiseSearch() {
    searchWrapper.style.height = '50px';
    searchWrapper.style.top = '0';
    searchWrapper.style.backgroundColor = 'red'

}

function showSearch() {
    searchWrapper.style.display = 'block';
}

function hideSearch() {
    searchWrapper.style.display = 'none';
}

function roundSearch() {
    searchBox.style.borderBottomLeftRadius = '15px';
    searchBox.style.borderBottomRightRadius = '15px';
}

function unroundSearch() {
    searchBox.style.borderBottomLeftRadius = '0px';
    searchBox.style.borderBottomRightRadius = '0px';
}

//Dropdown Functions

function clearDropdown() {
    while(docDrop.firstChild) {
        docDrop.removeChild(docDrop.firstChild);
    }
}

function hideDropdown() {
    docDrop.style.display = 'none';
    docDrop.style.paddingBottom = 'none';
    roundSearch();
}

function showDropdown() {
    docDrop.style.display = 'block';
    docDrop.style.paddingBottom = '7px';
    unroundSearch();
}

//Title Functions

function showTitle() {
    titleWrapper.style.display = 'flex';
}

function hideTitle() {
    titleWrapper.style.display = 'none';
}

//Set Home Screen
hideBody();
hideLoad();
hideDropdownLoad();

//Search Functionality
searchBox.addEventListener('keyup', () => {
    console.log('search value: ' + searchBox.value);
    value = searchBox.value;
    if(value.length <= 3) {
        hideDropdown();
        hideDropdownLoad();
        roundSearch();
        return;
    }

    hideDropdown();
    unroundSearch();
    showDropdownLoad();

    if(value.length > 3) {
        let city;
        let state;

        const lookup = ['washington', 'WA', 'oregon', 'OR', 'california', 'CA', 'idaho', 'ID', 'nevada', 'NV', 'montana', 'MT', 'wyoming', 'WY', 'utah', 'UT', 'arizona', 'AZ', 'colorado', 'CO', 'new mexico', 'NM', 'north dakota', 'ND', 'south dakota', 'SD', 'kansas', 'KS', 'oklahoma', 'OK', 'texas', 'TX', 'minnesota', 'MN', 'iowa', 'IA', 'missouri', 'MO', 'arkansas', 'AR', 'louisiana', 'LA', 'wisconsin', 'WI', 'illinois', 'IL', 'michigan', 'MI', 'indiana', 'IN', 'ohio', 'OH', 'kentucky', 'KY', 'tennessee', 'TN', 'mississippi', 'MS', 'alabama', 'AL', 'maine', 'ME', 'new hampshire', 'NH', 'vermont', 'VT', 'massachusettes', 'MA', 'rhode island', 'RI', 'connecticut', 'CT', 'new york', 'NY', 'new jersey', 'NJ', 'pennsylvania', 'delaware', 'DE', 'maryland', 'MD', 'west virginia', 'WV', 'virginia', 'VA', 'north carolina', 'NC', 'south carolina', 'SC', 'georgia', 'GA', 'florida', 'FL', 'alaska', 'AK', 'hawaii', 'HI', 'united states', 'US', 'united kingdom', 'UK', 'germany', 'DE', 'great britain', 'GB', 'france', 'FR', 'spain', 'ES', 'china', 'CN', 'russia', 'RU', 'japan', 'JP', 'india', 'IN', 'mexico', 'MX', 'canada', 'CA'];

        let geoQuery;

        if(value.includes(' ') || value.includes(',')) {
            value.includes(',') ? city = value.slice(0, value.indexOf(',')) : city = value.slice(0, value.indexOf(' '));
            value.includes(',') ? state = value.slice(value.indexOf(',') + 2, value.length) : state = value.slice(value.indexOf(' ') + 1, value.length);
        } else {
               city = value[0].toUpperCase() + value.slice(1, value.length).toLowerCase();

        }


        if(state) {
            state.length === 2 ? state = state.toUpperCase() : state = lookup[lookup.indexOf(state.toLowerCase()) + 1];
        }
            

        state ? geoQuery = `${city}, ${state}` : geoQuery = city;
        console.log(geoQuery);
    

        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${geoQuery}&limit=4&appid=${key}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                    
                clearDropdown();

                for(let loc of data) {
                    let objLatLong = `lat=${loc.lat.toString()}&lon=${loc.lon.toString()}`;
                    let locationName = loc.hasOwnProperty('state') ? `${loc.name}, ${loc.state}, ${loc.country}` : `${loc.name}, ${loc.state}`;
                    const newChild = document.createElement('li');
                    newChild.innerHTML = locationName;
                    newChild.classList.add('dropdown-item')
                    
                    newChild.addEventListener('click', (target) => {
                        let saveLatLong = objLatLong;
                        let fillField = locationName;
                        locationDisplayName = fillField;
                        searchBox.value = fillField;
                        latLong = saveLatLong;
                    }) 
                    
                    docDrop.appendChild(newChild);
                }
                
                hideDropdownLoad();
                
                if(!docDrop.firstChild) {
                    roundSearch();
                    hideDropdown();
                    hideLoad();
                    return;
                }
                
                showDropdown();
            })
    }
    
})


searchButton.onclick = (event) => {
    event.preventDefault();
    let image = './images/';

    clearDropdown();
    hideTitle();
    hideSearch();
    showLoad();


    if(!latLong) {
        showTitle();
        showSearch();
        hideLoad();
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?${latLong}&appid=${key}&units=imperial`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        docLoc.innerHTML = locationDisplayName;
        docTemp.innerHTML = data.main.temp.toString().slice(0, 2) + '&degF';
        docType.innerHTML = data.weather[0].main;
        docFL.innerHTML = data.main.feels_like.toString().slice(0, 2) + '&degF';
        docMin.innerHTML = data.main.temp_min.toString().slice(0, 2) + '&degF';
        docMax.innerHTML = data.main.temp_max.toString().slice(0, 2) + '&degF';
        docWS.innerHTML = data.wind.speed.toString().includes('.') ? (data.wind.speed).toString().slice(0, data.wind.speed.toString().indexOf('.') + 2) + ' mph' : data.wind.speed + ' mph';
        docHum.innerHTML = data.main.humidity + '%';
        
        searchBox.style.border = 'none';
        searchBox.value = '';
        searchBox.placeholder = 'Please Enter a City Name';
        hideLoad();
        hideTitle();
        roundSearch();
        hideDropdown();
        showSearch();
        showBody();
     
        switch(data.weather[0].main) {
            case 'Clear':
                if(hours <= 5 || hours >= 20) {
                    image += 'night.jpg';
                } else {
                    image += 'sunny.jpg';
                }
                break;
            case 'Clouds':
                image += 'cloudy.jpg';
                break;
            case 'Rain':
                image += 'raining.jpg';
                break;
            case 'Thunderstorm': 
                image += 'storm.jpg';
                break;
            case 'Snow': 
                image += 'snowing.jpg';
                break;
            case 'Drizzle': 
                image += 'raining.jpg';
                break;
            case 'Atmosphere': 
                image += 'misty.jpg'
                break;
            default:
                if(hours < 5 || hours > 20) {
                    image += 'night.jpg';
                } else {
                    image += 'sunny.jpg';
                }
                break;
        }
        document.getElementById('art').setAttribute('src', image);
        return data;
    })
    .catch(err => {
        console.log(err);
        showTitle();
        hideLoad();
        showSearch();
        searchBox.style.border = '1px solid red'
        searchBox.value = '';
        searchBox.placeholder = 'Please Enter a Valid City Name';
    })
    

}
