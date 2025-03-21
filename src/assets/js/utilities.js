import { cities } from './cities.js'
import { placeholder, spinner } from './placeholders.js'

const id = import.meta.env.VITE_APP_ID

const addRecent = search => {
	let recent = JSON.parse(localStorage.getItem('recentSearches'))

	if (recent === null) {
		localStorage.setItem('recentSearches', JSON.stringify([]))
		recent = JSON.parse(localStorage.getItem('recentSearches'))
	}

	let button = ''
	if (!recent.includes(search)) {
		button = `<button type="button" class="btn btn-sm btn-history  d-flex gap-2 justify-content-between align-items-center">${search}<span
		    class="fa fa-times remove"></span></button>`
	}

	$(button).appendTo('#history')
}

/**
 * Renders the list of recent searches stored in local storage to the page.
 * Looks up the 'recentSearches' key in local storage and appends a button for each item in the array to the #history div.
 */
const renderRecentSearches = () => {
	const recent = JSON.parse(localStorage.getItem('recentSearches'))

	if (recent === null || recent.length === 0) return

	let button = ''
	for (let i = 0; i < recent.length; i++) {
		button += `<button type="button" class="btn btn-sm btn-history d-flex gap-2 justify-content-between align-items-center">${recent[i]}<span
        class="fa fa-times remove"></span></button>`
	}
	$(button).appendTo('#history')
}

/**
 * Fetches forecast data from the OpenWeatherMap API and renders the weather data to the page.
 *
 * @param {number} lat - The latitude of the location to fetch the forecast for.
 * @param {number} lon - The longitude of the location to fetch the forecast for.
 *
 * @returns {Promise<void>} - A promise that resolves when the data has been fetched and the page has been updated.
 */
const getForecast = async (lat, lon) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast/daily?cnt=6&units=metric&lat=${lat}&lon=${lon}&exclude={part}&appid=${id}`
	const res = await fetch(url)
	const data = await res.json()

	const city = data.city.name
	const filterdData = data.list.map(item => {
		return {
			...item,
			date: moment.unix(item.dt).format('MMM Do, YYYY'),
			main: item.weather[0].main,
			description: item.weather[0].description,
			icon: item.weather[0].icon,
			humidity: item.humidity,
			temp: item.temp.day.toFixed(1),
			wind: item.speed.toFixed(1),
			country: data.city.country,
		}
	})

	const today = filterdData[0]

	const highlight = `		
		<li><i class="owi owi-5x owi-${today.icon}"></i></li>
		<li>Temp:  ${today.temp} &deg;C</li>
		<li>Wind:  ${today.wind} KPH</li>
		<li>Humidity:  ${today.humidity} %</li>	
	`
	$('#weatherHighlight').html(highlight)
	$('.today').addClass(`state-${today.icon}`)
	$('#todayTitle').text(`${city}, ${today.country} | ${today.date}`)

	let elements = ''
	filterdData.slice(1).forEach(item => {
		elements = `<div class="col">`
		elements += `<div class="p-3 border border-light bg-light rounded-5 h-100 state-${item.icon}">`
		elements += `<h3 class="date fs-6 fw-light">${item.date}</h3>`
		elements += `<ul class="weatherData fw-light">`
		elements += `<li><i class='owi owi-4x owi-${item.icon} mb-2'></i></li>`
		elements += `<li>Temp:  ${item.temp} &deg;C</li>`
		elements += `<li>Wind:  ${item.wind} Kph</li>`
		elements += `<li>Humidity:  ${item.humidity} %</li>`
		elements += `</ul></div></div>`
		$('#weatherData').append(elements)
	})
}

// If no city searched for or location not allowed, load weather for random city
const randomChosenCity = cities[Math.floor(Math.random() * cities.length)]

const renderForecast = async (city = randomChosenCity) => {
	const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
		city
	)}&limit=6&appid=${id}`
	const response = await fetch(url)
	const data = await response.json()
	if (data.length === 0) {
		throw new Error('City not found')
	}
	const { lat, lon, country, name } = data[0]
	const cityName = `${name}, ${country}`

	$('#weatherData').html('')

	getForecast(lat, lon)

	addRecent(cityName)

	const history = JSON.parse(localStorage.getItem('recentSearches'))
	if (!history) {
		localStorage.setItem('recentSearches', JSON.stringify([cityName]))
	} else {
		if (!history.includes(cityName)) {
			history.push(cityName)
		}
		localStorage.setItem('recentSearches', JSON.stringify(history))
	}
}

// Get user location
const locate = async () => {
	$('#weatherData').html(spinner)
	$('#weatherHighlight').html(spinner)
	navigator.geolocation.getCurrentPosition(position => {
		const lat = Math.fround(position.coords.latitude)
		const lon = Math.fround(position.coords.longitude)
		if (!lat || !lon) {
			throw new Error('Location not found')
		}
		$('#weatherData').html('')
		getForecast(lat, lon)
	})
}

const removeSearch = search => {
	const recentSearches = JSON.parse(localStorage.getItem('recentSearches'))
	const index = recentSearches.indexOf(search)
	recentSearches.splice(index, 1)
	localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
}

const getRandomCity = () => {
	let randNum = Math.floor(Math.random() * cities.length)
	let randomCity = cities[randNum]
	renderForecast(randomCity)
}

// Message alerts
const alertMessage = () => {
	$('.errInfo')
		.text(`No weather data found!`)
		.fadeIn(1000, function () {
			$(this)
				.addClass('show')
				.delay(2000)
				.fadeOut(2000, function () {
					$(this).removeClass('show')
				})
		})
}

export {
	renderForecast,
	renderRecentSearches,
	removeSearch,
	getRandomCity,
	locate,
}
