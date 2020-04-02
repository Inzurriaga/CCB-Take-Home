export const movies = (state = [], action) => {
  switch(action.type) {
    case "UPDATE_MOVIE_LIST":
      return state = [...action.movies];
    default:
      return state; 
  }
}