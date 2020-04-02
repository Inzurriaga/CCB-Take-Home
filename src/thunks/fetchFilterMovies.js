import { updateMovieList, updateFilter} from "../actions";

export const fetchFilterMovies = filter => {
  return async dispatch =>  {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${filter}?api_key=ed07b14687da633eafa43d7e054d26d2`);
      if(!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      const movies = data.results;
      dispatch(updateFilter(filter));
      dispatch(updateMovieList(movies));
    } catch (error) {
      console.log(error.message);
    }
  }
}