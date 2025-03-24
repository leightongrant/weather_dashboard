import { cities } from './cities.js'
import { spinner } from './placeholders.js'
import unsplash from '../../lib/unsplash.js'
import highlight from '../../components/highlights.js'
import weatherData from '../../components/weatherData.js'

const id = import.meta.env.VITE_APP_ID

export const getBackground = async condition => {
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
	recent.forEach(item => {
		button += `<button type="button" class="btn btn-sm btn-history d-flex gap-2 justify-content-between align-items-center">${item}<span
        class="fa fa-times remove"></span></button>`
	})
	$(button).appendTo('#history')
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

	highlight(lat, lon)
	weatherData(lat, lon)

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
		getCityName(lat, lon)
			.then(name => {
				renderForecast(name)
			})
			.catch(err => {
				console.log(err)
			})
	})
}

const getCityName = async (lat, lon) => {
	const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${id}`
	const response = await fetch(url)
	const data = await response.json()
	return data[0].name
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
