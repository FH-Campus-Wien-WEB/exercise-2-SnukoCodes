/* Task 1.1. Add your movie data here 
   and export it so it's available in server.js */
class Movie {
  constructor(imdbID, title, released, runtime, genres, directors, writers, actors, plot, poster, metascore, imdbRating) {
    this.title = title ?? "Title not available";
    this.released = released.toISOString().split('T')[0];
    this.Runtime = runtime ? parseInt(runtime) : "Runtime not available";
    this.Genres = genres ? genres.split(',').map(g => g.trim()) : [];
    this.Directors = directors ? directors.split(',').map(d => d.trim()) : [];
    this.Writers = writers ? writers.split(',').map(w => w.trim()) : [];
    this.Actors = actors ? actors.split(',').map(a => a.trim()) : [];
    this.Plot = plot ?? "Plot not available";
    this.poster = poster ?? "Poster not available";
    this.Metascore = metascore && !isNaN(parseFloat(metascore)) ? parseFloat(metascore) : "Metascore not available";
    this.imdbRating = imdbRating && !isNaN(parseFloat(imdbRating)) ? parseFloat(imdbRating) : "IMDb Rating not available";
    this.imdbID = imdbID ?? "IMDb ID not available";
  }

  static fromJSON(json) {
    return new Movie(
      json.imdbID,
      json.Title,
      new Date(json.Released),
      json.Runtime,
      json.Genre,
      json.Director,
      json.Writer,
      json.Actors,
      json.Plot,
      json.Poster,
      json.Metascore,
      json.imdbRating
    );
  }

   static getMovies() {
     if (!Movie._store) {
       const yourName = {"Title":"Your Name.","Year":"2016","Rated":"TV-PG","Released":"07 Apr 2017","Runtime":"106 min","Genre":"Animation, Drama, Fantasy","Director":"Makoto Shinkai","Writer":"Makoto Shinkai","Actors":"Ryûnosuke Kamiki, Mone Kamishiraishi, Ryo Narita","Plot":"Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.","Language":"Japanese","Country":"Japan","Awards":"17 wins & 27 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BMjI1ODZkYTgtYTY3Yy00ZTJkLWFkOTgtZDUyYWM4MzQwNjk0XkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"8.4/10"},{"Source":"Rotten Tomatoes","Value":"98%"},{"Source":"Metacritic","Value":"81/100"}],"Metascore":"81","imdbRating":"8.4","imdbVotes":"385,171","imdbID":"tt5311514","Type":"movie","DVD":"N/A","BoxOffice":"$5,017,246","Production":"N/A","Website":"N/A","Response":"True"}
       const ProjectHailMary = {"Title":"Project Hail Mary","Year":"2026","Rated":"PG-13","Released":"20 Mar 2026","Runtime":"156 min","Genre":"Drama, Sci-Fi, Thriller","Director":"Phil Lord, Christopher Miller","Writer":"Drew Goddard, Andy Weir","Actors":"Ryan Gosling, Milana Vayntrub, Ken Leung","Plot":"Science teacher Ryland Grace wakes up alone on a spaceship light-years from Earth. As his memory returns, he uncovers a mission to stop a mysterious substance killing the sun, and save Earth. An unexpected friendship may be the key.","Language":"English","Country":"United States","Awards":"1 nomination total","Poster":"https://m.media-amazon.com/images/M/MV5BNTkwNzJiYTctNzI3NC00NjE1LTlhYjktY2Q5MTdmMWFmNzcxXkEyXkFqcGc@._V1_SX300.jpg","Ratings":[],"Metascore":"N/A","imdbRating":"N/A","imdbVotes":"N/A","imdbID":"tt12042730","Type":"movie","DVD":"N/A","BoxOffice":"N/A","Production":"N/A","Website":"N/A","Response":"True"}
       const TheHangover = {"Title":"The Hangover","Year":"2009","Rated":"R","Released":"05 Jun 2009","Runtime":"100 min","Genre":"Comedy","Director":"Todd Phillips","Writer":"Jon Lucas, Scott Moore","Actors":"Zach Galifianakis, Bradley Cooper, Justin Bartha","Plot":"Three buddies wake up from a bachelor party in Las Vegas with no memory of the previous night and the bachelor missing. They must make their way around the city in order to find their friend in time for his wedding.","Language":"English","Country":"Germany, United States","Awards":"Nominated for 1 BAFTA Award13 wins & 25 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BNDI2MzBhNzgtOWYyOS00NDM2LWE0OGYtOGQ0M2FjMTI2NTllXkEyXkFqcGc@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.7/10"},{"Source":"Rotten Tomatoes","Value":"79%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"7.7","imdbVotes":"922,266","imdbID":"tt1119646","Type":"movie","DVD":"N/A","BoxOffice":"$277,339,746","Production":"N/A","Website":"N/A","Response":"True"}
       const movie1 = Movie.fromJSON(yourName)
       const movie2 = Movie.fromJSON(ProjectHailMary)
       const movie3 = Movie.fromJSON(TheHangover)
       Movie._store = { [movie1.imdbID]: movie1, [movie2.imdbID]: movie2, [movie3.imdbID]: movie3 };
     }
     return Movie._store;
   }

   static updateMovie(imdbID, data) {
     const store = Movie.getMovies();
     if (!store[imdbID]) return false;
     Object.assign(store[imdbID], data);
     return true;
   }

   static addMovie(imdbID, data) {
     const store = Movie.getMovies();
     store[imdbID] = data;
     return data;
   }
}

module.exports = Movie;