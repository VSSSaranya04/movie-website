/***** 🎥 Movie Madness Incoming (hope this doesn’t crash Chrome) *****/
const movies = [
  // Hollywood picks
  {
    title: "Inception",
    year: 2010,
    genre: "SCI-FI",
    language: "English",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpcMJuNqLlgfG1KlKFe217dtSQapQxeYjQ6g&s",
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "ACTION",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "SCI-FI",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  {
    title: "Avengers: Endgame",
    year: 2019,
    genre: "ACTION",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
  },
  {
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "DRAMA",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  },

  // Telugu movies
  {
    title: "RRR",
    year: 2022,
    genre: "ACTION",
    language: "Telugu",
    poster: "https://assets.thehansindia.com/h-upload/2021/07/26/1091569-rrr.webp",
  },
  {
    title: "Baahubali: The Beginning",
    year: 2015,
    genre: "FANTASY",
    language: "Telugu",
    poster: "https://m.media-amazon.com/images/M/MV5BM2YxZThhZmEtYzM0Yi00OWYxLWI4NGYtM2Y2ZDNmOGE0ZWQzXkEyXkFqcGc@._V1_.jpg",
  },

  // Hindi
  {
    title: "3 Idiots",
    year: 2009,
    genre: "COMEDY-DRAMA",
    language: "Hindi",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEllCgCNIw-H6x2NjwyGUevmYCKuIAYl8Dw&s",
  },
  {
    title: "Dangal",
    year: 2016,
    genre: "SPORTS",
    language: "Hindi",
    poster: "https://image.tmdb.org/t/p/w500/p2lVAcPuRPSO8Al6hDDGw0OgMi8.jpg",
  },

  // Tamil (still missing a few classics I should add later…)
  {
    title: "Vikram",
    year: 2022,
    genre: "ACTION-THRILLER",
    poster: "https://www.ticketly.eu/Photos/Event/Event_28036.jpg",
  },
  {
    title: "Mersal",
    year: 2017,
    genre: "ACTION-DRAMA",
    poster: "https://images.jdmagicbox.com/comp/jd_social/news/2018aug11/image-320817-s5oeu9zqq6.jpg",
  }
];

// -------- DOM wrangling (probably should modularize this later) --------
const moviesContainer = document.getElementById("moviesContainer");
const searchBox = document.getElementById("searchBox");
const categoryFilter = document.getElementById("categoryFilter");
const toggleTheme = document.getElementById("toggleTheme");

// Build a movie card (kinda verbose but hey, clarity > cleverness)
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  const img = document.createElement("img");
  img.src = movie.poster;
  img.alt = movie.title;

  // Fallback image if poster link is broken
  img.onerror = () => {
    img.onerror = null; // avoid infinite loop
    img.src = "https://via.placeholder.com/400x600?text=No+Image";
  };

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const year = document.createElement("p");
  year.textContent = `Year: ${movie.year || "??"}`; // not all have year set

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${movie.genre}`;

  // future idea: maybe show language too?
  // const lang = document.createElement("p");
  // lang.textContent = `Lang: ${movie.language}`;

  card.append(img, title, year, genre);
  return card;
}

// Put movies on the page
function displayMovies(list) {
  moviesContainer.innerHTML = "";
  if (list.length === 0) {
    // very lazy inline style, but it works
    moviesContainer.innerHTML = `<p style="grid-column:1/-1;text-align:center;opacity:.7;">No movies found 🙃</p>`;
    return;
  }

  // NOTE: could use map + join here, but appendChild loop feels more... tangible
  list.forEach((m) => {
    const card = createMovieCard(m);
    moviesContainer.appendChild(card);
  });
}

// Filtering logic
function getFilteredMovies() {
  const query = searchBox ? searchBox.value.toLowerCase() : "";
  const cat = categoryFilter ? categoryFilter.value : "all";

  // tiny redundancy: storing into separate variable instead of chaining
  let filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(query)
  );

  if (cat !== "all") {
    filtered = filtered.filter((m) => m.genre === cat);
  }

  return filtered;
}

function applyFilters() {
  const results = getFilteredMovies();
  displayMovies(results);
}

// Dark mode toggle (doesn’t save preference yet, maybe later?)
if (toggleTheme) {
  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");

    // lol this label logic is a little backwards but works
    toggleTheme.textContent = isLight ? "🌙 Dark Mode" : "☀️ Light Mode";
  });
}

// Event listeners
if (searchBox) {
  searchBox.addEventListener("input", applyFilters);
}
if (categoryFilter) {
  categoryFilter.addEventListener("change", applyFilters);
}

// Initial render
displayMovies(movies);
