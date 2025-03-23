import { cities } from './cities.js'
import { spinner } from './placeholders.js'
import unsplash from '../../lib/unsplash.js'

const id = import.meta.env.VITE_APP_ID

const getBackground = async condition => {
	const req = await unsplash.search.getPhotos({
		query: condition,
	})
	const randNum = Math.floor(Math.random() * req.response.results.length)
	return req.response.results[randNum].urls.regular
}

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
	try {
		const res = await fetch(url, {
			mode: 'cors',
			cache: 'force-cache',
		})
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
				temp: item.temp.day.toFixed(0),
				wind: item.speed.toFixed(0),
				country: data.city.country,
			}
		})

		const today = filterdData[0]

		const condition = await getBackground(`${today.description}`)

		$('.main-forecast').attr('style', `background-image: url('${condition}')`)

		const highlight = `
		<div class="today  text-dark rounded-5 fw-light">
			<div class="border border-1 border-light weather-inner p-3 rounded-5 d-grid gap-2 shadow-lg">
				<h2 class="fs-5 fw-bold ps-4" id="todayTitle">${city}, ${today.country} | <span class="fw-light">${today.date}</span></h2>
				<div class="fs-6 fw-light ps-4 text-capitalize">${today.description}</div>
				<div><img src="https://openweathermap.org/img/wn/${today.icon}@2x.png" alt="${today.description}"/></div>
				<div class="d-flex gap-3 ps-4">
					<div><i class="fa-solid fa-temperature-three-quarters"></i>  ${today.temp} &deg;C</div>
					<div><i class="fa-solid fa-wind"></i>  ${today.wind} KPH</div>
					<div><i class="fa-solid fa-droplet"></i>  ${today.humidity} %</div>
				</div>
			</div>
		</div>
			
	`
		$('#weatherHighlight').html(highlight)

		let elements = ''
		filterdData.slice(1).forEach(item => {
			elements = `<div class="flex-grow-1">`
			elements += `<div class="border border-1 border-light text-dark  rounded-5 h-100 shadow-lg">`
			elements += `<div class="p-3 rounded-5 weather-inner">`
			elements += `<h3 class="date fs-6 fw-bold text-center">${item.date}</h3>`
			elements += `<div class="fs-6 fw-light text-center text-capitalize">${item.description}</div>`
			elements += `<div class="weatherData fw-light">`
			elements += `<div><img src="https://openweathermap.org/img/wn/${item.icon}@2x.png" alt="${item.description}"/></div>`
			elements += `<div class="ps-4">`
			elements += `<div class="d-flex gap-2 align-items-center"><i class="fa-solid fa-temperature-three-quarters"></i>  ${item.temp} &deg;C</div>`
			elements += `<div class="d-flex gap-2 align-items-center"><i class="fa-solid fa-wind"></i>  ${item.wind} Kph</div>`
			elements += `<div class="d-flex gap-2 align-items-center"><i class="fa-solid fa-droplet"></i>  ${item.humidity} %</div>`
			elements += `</div></div></div></div></div>`
			$('#weatherData').append(elements)
		})
	} catch (err) {
		console.log(err)
	}
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
