function reverseString(s) {
  return s.split("").reverse().join("");
}

function editMovie(imdbID) {
  // Task 3: wire up PUT /movies/:imdbID here
  
  alert("Edit movie: " + imdbID);
}

function buildMovieCard(movie) {
  const template = document.getElementById("movie-template")
  const card = template.content.cloneNode(true).querySelector("article")

  card.id = movie.imdbID

  const img = card.querySelector("img")
  img.src = movie.poster
  img.alt = "Poster of " + movie.title

  card.querySelector("h2").textContent = movie.title
  card.querySelector(".btn-edit").dataset.imdbID = movie.imdbID

  card.querySelector(".released").innerHTML = "<strong>Released:</strong> " + new Date(movie.released).toLocaleDateString()
  card.querySelector(".runtime").innerHTML = "<strong>Runtime:</strong> " + movie.Runtime + " min"
  card.querySelector(".rating").textContent = movie.imdbRating

  const genresEl = card.querySelector(".genres")
  movie.Genres.forEach(g => {
    const span = document.createElement("span")
    span.className = "genre"
    span.textContent = g
    genresEl.appendChild(span)
  })

  card.querySelector(".movie-plot").textContent = movie.Plot

  const toListItems = (items, ul) => items.forEach(item => {
    const li = document.createElement("li")
    li.textContent = item
    ul.appendChild(li)
  })
  toListItems(movie.Directors, card.querySelector(".directors ul"))
  toListItems(movie.Writers, card.querySelector(".writers ul"))
  toListItems(movie.Actors, card.querySelector(".actors ul"))

  return card
}

window.onload = function () {
  const xhr = new XMLHttpRequest()
  xhr.onload = function () {
    const bodyElement = document.querySelector("body")
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText)
      movies.forEach(movie => {
        bodyElement.appendChild(buildMovieCard(movie))
      })
    } else {
      bodyElement.append("Daten konnten nicht geladen werden, Status " + xhr.status + " - " + xhr.statusText)
    }
  }
  xhr.open("GET", "/movies")
  xhr.send()
}
