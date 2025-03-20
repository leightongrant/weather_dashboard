import { cities } from './cities.js'
import {
	renderForecast,
	renderRecentSearches,
	removeSearch,
	getRandomCity,
	locate,
} from './logic.js'

$(function () {
	if (navigator.geolocation) {
		locate()
	}
	renderRecentSearches()

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
