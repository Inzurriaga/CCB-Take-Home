import { updateMovieList, updateFilter } from "../actions";

export const fetchSearchMovies = search => {
  return async dispatch =>  {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ed07b14687da633eafa43d7e054d26d2&language=en-US&query=${search}&page=1&include_adult=false`);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      const movies = data.results;
      dispatch(updateFilter("search"));
      dispatch(updateMovieList(movies));
    } catch (error) {
      console.log(error.message);
    }
  }
}