
const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const region  = document.querySelectorAll(".region");
const search  = document.querySelector(".search");
const toggle  = document.querySelector(".toggle");
const moon = document.querySelector(".moon");


async function getCountry() {
    const url = await fetch('./data.json');
    const res = await url.json();
    console.log(res);
    res.forEach(element => {
        showCountry(element);
    });
    
}

getCountry();
function showCountry(data) {
    const country = document.createElement("div")
    country.classList.add("country")
    country.innerHTML = `
    <div class="country-img">
        <img src="${data.flag}" alt="">
    </div>
    <div class="country-info">
        <p class="countryName">${data.name}</p>
        <p><strong>Population:</strong>${data.population}</p>
        <p class="regionName"><strong>Region:</strong>${data.region}</p>
        <p><strong>Capital:</strong>${data.capital}</p>
        <p><strong>Language:</strong>${data.languages[0].name}</p>
    </div>`
countriesElem.appendChild(country)
country.addEventListener("click", ()=> {
    showCountryDetail(data)
});
}

dropDown.addEventListener('click', () => {
    dropElem.classList.toggle("showDropDown");
    
});

const regionName  = document.getElementsByClassName("regionName");
const countryName  = document.getElementsByClassName("countryName");

region.forEach(element => {
    element.addEventListener('click', ()=> {
        console.log(element);
       Array.from(regionName).forEach(elem => {
            if(elem.innerText.includes(element.innerText) || element.innerText == "All") {
                elem.parentElement.parentElement.style.display="grid";
            } else {
                elem.parentElement.parentElement.style.display="none";
            }
       })
    })
});

search.addEventListener("input", () => {
    Array.from(countryName).forEach(elem => {
        if(elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.style.display="grid";
        } else {
            elem.parentElement.parentElement.style.display="none";
        }
   })
});

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    moon.classList.toggle("fas");
});

const countryModal = document.querySelector(".countryModal");

function showCountryDetail(data) {
    countryModal.classList.toggle("show");
    countryModal.innerHTML=`
    <button class="back">
            <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            Back
        </button>
        <div class="modal">
            <div class="leftModal">
                <img src="${data.flag}" alt="flag" srcset="">
            </div>
            <div class="rightModal">
                <h1>${data.name}</h1>
                <div class="innerRight-container">
                    <div class="innerLeft inner">
                        <p><strong>Native Name:</strong>${data.nativeName}</p>
                        <p><strong>Population:</strong>${data.population}</p>
                        <p><strong>Region:</strong>${data.region}</p>
                        <p><strong>Sub Region:</strong>${data.subregion}</p>
                        <p><strong>Capital:</strong>${data.capital}</p>
                    </div>
                    <div class="innerRight inner">
                        <p><strong>Top Level Domain:</strong>${data.topLevelDomain}</p>
                        <p><strong>Currencies:</strong>${data.currencies.map(elem=>elem.name)}</p>
                        <p><strong>Languages:</strong>${data.languages.map(elem=>elem.name)}</p>
                    </div>
                </div>
                <div class="border-countries-container">
                    <div class="border-countries-wrapper">
                        <strong>Border Countries:</strong>
                        <p>
                            ${data.borders}
                        </p>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    `;

    const back = countryModal.querySelector(".back");
    back.addEventListener("click", ()=> {
        countryModal.classList.toggle("show");
    });
}

