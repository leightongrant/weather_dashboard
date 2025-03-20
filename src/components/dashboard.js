const dashboard = () => {
	return `
        <header
			class="container-fluid text-center text-white bg-blue bg-gradient p-2 weather-header"
		>
			<h1>Weather Dashboard</h1>
		</header>
	
		<main class="container-fluid">
			<div
				class="container bg-blue bg-gradient border border-dark main-inner rounded-3 p-3 my-5 text-light"
			>
				<div class="row">
					<aside class="col-lg-3 pb-1 mt-5">
						<div class="container">
							<div class="row">
								<h2 id="form-heading" class="mt-1 h3 form-label fs-4">
									Search for a City:
								</h2>

								<div class="input-group-search mb-3">
									<!-- <span class="input-group-text" id="inputGroup-sizing-default"><i class="fa fa-search"></i></span> -->
									<input
										type="text"
										class="form-control mb-3 rounded-pill"
										aria-label="Sizing example input"
										aria-describedby="inputGroup-sizing-default"
										id="citySearch"
										placeholder="Search"
									/>
									<div
										class="searchButtons d-flex justify-content-center flex-column"
									>
										<div class="p-1">
											<button
												type="button"
												name="searchButton"
												class="btn btn-secondary btn-md btn-block ml-0 mr-2 mb-2 d-block w-100"
												id="searchButton"
											>
												<i class="fa fa-search"></i> Search
											</button>
										</div>
										<div class="d-flex">
											<button
												type="button"
												name="randomCity"
												class="btn btn-secondary btn-md btn-block m-1 d-block w-100"
												id="randomCity"
											>
												Random City
											</button>
											<button
												type="button"
												name="getLocation"
												class="btn btn-secondary btn-md btn-block m-1 d-block w-100"
												id="getLocation"
											>
												Get Location
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="container">
							<div class="row">
								<div class="col">
									<div class="list-group">
										<h2 id="recent-heading" class="mt-1 h3 form-label fs-5">
											Recent Searches:
										</h2>
										<div class="d-grid gap-2" id="history"></div>
									</div>
								</div>
							</div>
						</div>
					</aside>

					<section class="col-lg-9 pb-1 mt-5">
						<section id="today" class="" role="region" aria-live="polite">
							<div class="container">
								<div class="row">
									<div class="col">
										<div class="alert alert-warning errInfo hide" role="alert">
											A simple warning alert—check it out!
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<div
											class="p-3 today border border-dark bg-transparent rounded-3"
										>
											<h2 class="fs-4">
												<span id="cityName"></span> -
												<span id="todayDate"></span>
											</h2>
											<ul id="weatherHighlight">
												<li id="todayIcon"></li>
												<li id="todayTemp">Temp:</li>
												<li id="todayWind">Wind:</li>
												<li id="todayHumidity">Humidity:</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section
							id="forecast"
							class="mt-3"
							role="region"
							aria-live="polite"
						>
							<div class="container">
								<div class="row">
									<div class="col">
										<h2 id="weatherTitle" class="fs-4 mb-4">5 Day Forecast</h2>
									</div>
								</div>
							</div>

							<div class="container">
								<div
									class="row row-cols-1 row-cols-md-2 row-cols-lg-5"
									id="weatherData"
								></div>
							</div>
						</section>
					</section>
				</div>
			</div>
		</main>       
    `
}

export default dashboard
