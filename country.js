const CountryName = new URLSearchParams(location.search).get('name');
const img = document.querySelector('.country-details img')
const CountryH1 = document.querySelector('h1')
const nativeNAme = document.querySelector('.nativeNAme')
const Population = document.querySelector('.Population')
const Region = document.querySelector('.Region')
const SubRegion = document.querySelector('.Sub-Region')
const Capital = document.querySelector('.Capital')
const Domain = document.querySelector('.Domain')
const Currencies = document.querySelector('.Currencies')
const Languages = document.querySelector('.Languages')
const BorderCountry = document.querySelector('.Border-country')

fetch(`https://restcountries.com/v3.1/name/${CountryName}?fullText=true`)
.then((res)=> res.json())
.then(([country]) => {
    
    // console.log(country);
    img.src = country.flags.svg
    CountryH1.innerText = `${country.name.common}`
    nativeNAme.innerHTML = `${country.name.common}`
    Population.innerText = `${country.population.toLocaleString()}`
    Region.innerText = `${country.region}`
    Currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
    Domain.innerText = `${country.tld}`
    Languages.innerText = Object.values(country.languages).join(", ")

    if(country.subregion){
        SubRegion.innerText = `${country.subregion}`
    }

    if(country.capital){
         Capital.innerText = `${country.capital}`
    }

    if(country.borders){
        country.borders.forEach(borders => {
            // console.log(borders);
            fetch(`https://restcountries.com/v3.1/alpha/${borders}`).then((res) => res.json())
            .then(([borderCountry])=>{
                console.log(borderCountry);
                const BorderCountryTags = document.createElement('a')
                BorderCountryTags.innerText = borderCountry.name.common
                BorderCountryTags.href = `country.html?name=${borderCountry.name.common}`
                console.log(BorderCountryTags);

                BorderCountry.append(BorderCountryTags)
                
                
            })
        });
    }
   
    
})




