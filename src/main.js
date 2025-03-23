import '/src/assets/css/style.css'
import dashboard from './components/dashboard'
import { cities } from './assets/js/cities.js'
import { noResults } from './assets/js/placeholders.js'
import {
	renderForecast,
	renderRecentSearches,
	removeSearch,
	getRandomCity,
	locate,
} from './assets/js/utilities.js'

document.querySelector('#app').innerHTML = dashboard()

$(function () {
	const searchHistory = JSON.parse(localStorage.getItem('recentSearches'))
	const recentSearches = JSON.parse(localStorage.getItem('recentSearches'))

	if (searchHistory !== null && searchHistory.length > 0) {
		if (searchHistory.length === 1) {
			renderForecast(searchHistory[0])
		} else {
			renderForecast(searchHistory[searchHistory.length - 1])
		}
	} else if (searchHistory === null || searchHistory.length === 0) {
		$('#weatherData').html(noResults)
	}

	if (recentSearches !== null && recentSearches.length > 0) {
		renderRecentSearches()
	}

	$('#citySearch').autocomplete({
		source: cities,
	})

	$('#citySearch').keypress(function (event) {
		if (event.keyCode === 13) {
			renderForecast($('#citySearch').val().trim())
			$('#citySearch').val('')
		}
	})

	$('#searchButton').on('click', function () {
		renderForecast($('#citySearch').val().trim())
		$('#citySearch').val('')
	})

	$('#history').on('click', event => {
		event.stopPropagation()
		let thisSearch = $(event.target).text()
		renderForecast(thisSearch)
	})

	$('#history').on('click', '.remove', event => {
		event.stopPropagation()
		let thisSearch = $(event.target).parent().text()

		removeSearch(thisSearch)
		location.reload()
	})

	$('#randomCity').on('click', () => {
		getRandomCity()
	})

	$('#getLocation').on('click', () => {
		$('#weatherData').html('')
		locate()
	})
})
