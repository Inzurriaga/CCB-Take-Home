export const filter = (state = "", action) => {
  switch(action.type) {
    case "UPDATE_FILTER":
      return state = action.filter;
    default:
      return state; 
  }
}