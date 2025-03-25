const id = import.meta.env.VITE_APP_ID
import { getBackground } from '../assets/js/utilities'
const highlight = async (lat, lon) => {
	const url = `https://api.openweathermap.org/data/2.5/forecast?cnt=12&units=metric&lat=${lat}&lon=${lon}&appid=${id}`
	try {
		const res = await fetch(url, {
			mode: 'cors',
			cache: 'force-cache',
		})

		const data = await res.json()

		const city = data.city.name
		const country = data.city.country

		const filterdData = data.list.map(item => {
			return {
				date: moment.unix(item.dt).format('MMM Do'),
				time: moment.unix(item.dt).format('HH:mm'),
				main: item.weather[0].main,
				description: item.weather[0].description,
				icon: item.weather[0].icon,
				humidity: item.main.humidity,
				temp: item.main.temp.toFixed(0),
				wind: item.wind.speed.toFixed(0),
			}
		})

		const today = filterdData[0]
		const condition = await getBackground(`${today.description}`)
		const hours = filterdData.map(forecast => {
			return `
                        <div class="d-grid gap-1 bg-transparent border border-light-subtle rounded-2  highlight justify-content-center p-1">
                            <div class="fw-semibold" fs-6>${forecast.time}</div>                         
                            <div> ${forecast.temp} &deg;C</div>
                        </div>`
		})

		$('.main-forecast').attr('style', `background-image: url('${condition}')`)

		const highlight = `
            <div class="today  text-dark rounded-5 fw-light">
                <div class="border border-1 border-light weather-inner p-3 rounded-5 d-grid gap-2 shadow-lg">
                    <h2 class="fs-5 fw-bold ps-4 mb-3" id="todayTitle">${city}, ${country} | <span class="fw-light">${
			today.date
		}</span></h2>
                <div class="d-flex gap-5 align-items-center">
                    <div class="">                        
                        <div><img src="https://openweathermap.org/img/wn/${
													today.icon
												}@2x.png" alt="${today.description}"/>
                        </div>
                    </div>
                    <div class="d-flex flex-wrap gap-2 gap-xl-5">
                    <div class="fs-6 fw-semibold text-capitalize">${
											today.description
										}</div>
                        <div>WindSpeed: <i class="fa-solid fa-wind"></i>  ${
													today.wind
												} KPH</div>
                        <div>Temperature: <i class="fa-solid fa-temperature-three-quarters"></i>  ${
													today.temp
												} &deg;C</div>		          
		                <div>Humidity: <i class="fa-solid fa-droplet"></i>  ${
											today.humidity
										} %</div>		
                    </div>
                </div>
                    
                        <div class="d-flex gap-2 highlight-container pt-3">           
                            ${hours.toString().split(',').join('')}
                        </div>
                    
                </div>
            </div>			
        `
		$('#weatherHighlight').html(highlight)
	} catch (error) {
		console.log(error)
	}
}

export default highlight
