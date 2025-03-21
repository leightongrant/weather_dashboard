const dashboard = () => {
	return `
        <header
			class="header py-2"
		>
			<div class="container">
				<h1 class="text-center">Weather Dashboard</h1>
			</div>
		</header>
	
		<main class="main py-5">
			<div
				class="container dashboard-wrapper rounded-5 shadow-lg"
			>
			
				<div class="row row-cols-1 row-cols-lg-2">
					<aside class="col-lg-3 search-and-history py-5 px-2">
						<div class="container">
							<div class="row">
								<p id="form-heading" class="mt-1 h3 form-label fs-5">
									Search for a City:
								</p>

								<div class="input-group-search mb-3">
									<!-- <span class="input-group-text" id="inputGroup-sizing-default"><i class="fa fa-search"></i></span> -->
									<input
										type="text"
										class="form-control mb-3 rounded"										
										id="citySearch"
										placeholder="Search"
									/>
									<div
										class="searchButtons d-flex justify-content-center flex-column gap-3"
									>
										
											<button
												type="button"
												name="searchButton"
												class="btn btn-custom flex-grow-1"
												id="searchButton"
											>
												<i class="fa fa-search"></i> Search
											</button>
										
										<div class="d-flex flex-wrap gap-3">
											<button
												type="button"
												name="randomCity"
												class="btn btn-custom flex-grow-1"
												id="randomCity"
											>
												<i class="fa-solid fa-shuffle"></i> Random City
											</button>
											<button
												type="button"
												name="getLocation"
												class="btn btn-custom flex-grow-1"
												id="getLocation"
											>
												<i class="fa-solid fa-location-crosshairs"></i> Get Location
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
										<div class="d-flex flex-wrap gap-2" id="history"></div>
									</div>
								</div>
							</div>
						</div>
					</aside>

					<section class="col-lg-9 main-forecast p-5 rounded-5">
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
											class="p-3 today border border-light bg-transparent rounded-5 fw-light"
										>
											<h2 class="fs-5 fw-light" id="todayTitle">												
											</h2>
											<ul id="weatherHighlight">												
											</ul>
										</div>
									</div>
								</div>
							</div>
						</section>

						<section
							id="forecast"
							class="mt-5"
							role="region"
							aria-live="polite"
						>							
							<div class="container">
								<div
									class="row row-cols-1 row-cols-md-2 row-cols-lg-5 g-5"
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
