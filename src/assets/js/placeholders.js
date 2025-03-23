const placeholder = `

<div class="col">
<div class="card" aria-hidden="true">
  <span class="placeholder col-7 bg-dark"></span>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-6 bg-dark"></span>
      <span class="placeholder col-8 bg-dark"></span>
    </p>
  </div>
</div>
</div>

<div class="col">
<div class="card" aria-hidden="true">
  <span class="placeholder col-7 bg-dark"></span>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-6 bg-dark"></span>
      <span class="placeholder col-8 bg-dark"></span>
    </p>
  </div>
</div>
</div>

<div class="col">
<div class="card" aria-hidden="true">
  <span class="placeholder col-7 bg-dark"></span>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-6 bg-dark"></span>
      <span class="placeholder col-8 bg-dark"></span>
    </p>
  </div>
</div>
</div>

<div class="col">
<div class="card" aria-hidden="true">
  <span class="placeholder col-7 bg-dark"></span>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-6 bg-dark"></span>
      <span class="placeholder col-8 bg-dark"></span>
    </p>
  </div>
</div>
</div>

<div class="col">
<div class="card" aria-hidden="true">
  <span class="placeholder col-7 bg-dark"></span>
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-4 bg-dark"></span>
      <span class="placeholder col-6 bg-dark"></span>
      <span class="placeholder col-8 bg-dark"></span>
    </p>
  </div>
</div>
</div>



`

const spinner = `
    <div class="container">
        <div class="row">
            <div class="col d-flex justify-content-center spinner-wrapper align-items-center">
                <div class="spinner-border" role="status">
                 <span class="sr-only">Loading...</span>
               </div>
            </div>
        </div>
    </div>
  `
const noResults = `
  <div class="container">
      <div class="row">
          <div class="col d-flex justify-content-center spinner-wrapper align-items-center">
              <div class="d-grid gap-2 align-content-center">
               <i class="fa-solid fa-cloud-sun fs-1 text-center"></i>
               <h3 class="text-center fs-5">Please search for a city</h3>
             </div>
          </div>
      </div>
  </div>
`

export { placeholder, spinner, noResults }
