const apiKey = '79dc86a3429b5019b467674e06ed8dc4'
const apiCountryURL = 'https://countryflagsapi.com/png/'
const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector("#city")
const tempElement = document.querySelector("#temperature span")
const descElement = document.querySelector("#description")
const weatherIconElement = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const umidityElement = document.querySelector("#umidity span")
const windElement = document.querySelector("#wind span")

//funções

const getWeatherData = async (city) =>{

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    
    const res = await fetch(apiWeatherURL)
    
    const data = await res.json()
    
    return data
}

const showWeatherData = async (city) =>{

    const data = await getWeatherData(city)
    
    cityElement.innerText = data.name
    tempElement.innerText = parseInt(data.main.temp)
    weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    countryElement.setAttribute('src', apiCountryURL + data.sys.country)
    windElement.innerText = `${data.wind.speed}km/h`
    umidityElement.innerText = `${data.main.humidity}%`
    descElement.innerText = data.weather[0].description
}


//eventos

searchBtn.addEventListener('click', async(e) =>{
    e.preventDefault()
    const hide = document.querySelector (".hide")
    const city = cityInput.value
    showWeatherData(city)
    hide.style.display = 'grid'
    //console.log(city)
})

cityInput.addEventListener('keyup', e => {
    if (e.code === 'Enter'){
        const city = e.target.value
        const hide = document.querySelector (".hide")
        hide.style.display = 'grid'

        showWeatherData(city)
    }
})

