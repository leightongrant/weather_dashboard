const id = import.meta.env.VITE_APP_ID
const weatherData = async (lat, lon) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast/daily?cnt=6&units=metric&lat=${lat}&lon=${lon}&exclude={part}&appid=${id}`
	try {
		const res = await fetch(url, {
			mode: 'cors',
			cache: 'force-cache',
		})
		const data = await res.json()
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
	} catch (error) {
		console.log(error)
	}
}

export default weatherData
