import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { fetchSearchMovies } from "../../thunks/fetchSearchMovies";

class MovieDescription extends Component {
  constructor() {
    super();
    this.state = {
        movie: {},
        searchInput: "",
        redirect: false
    };
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.getMovieDescription();
  }

  updateSearch = (event) => {
    this.setState({
      searchInput: event.target.value
    });
  }

  searchMovie = () => {
    this.props.fetchSearchMovies(this.state.searchInput);
    this.setState({
      redirect: true
    });
  }

  getMovieDescription = async () => {
    let promise = await fetch(`https://api.themoviedb.org/3/movie/${this.props.id}?api_key=ed07b14687da633eafa43d7e054d26d2&language=en-US&append_to_response=videos,recommendations,release_dates`);
    let movie = await promise.json();
    console.log(movie);
    this.setState({
      movie
    });
  }

  getMovieMPAA = () => {
      let usRating = this.state.movie.release_dates.results.filter(date => {
        return date.iso_3166_1 === "US"
      });
      let rating = usRating.length > 0 ? usRating[0].release_dates[0].certification : false;
      return rating && ( <span>{ rating }</span>);
  }

  defaultImage = (event) => {
    event.target.src = "https://solomono.net/images/default.png";
  }

  render() {
    let { movie, redirect } = this.state;
    return (
      <section>
        { redirect && <Redirect to="/" />}
        <header className="movie-header">
          <Link to="/" className="home-link">
            <h1>Movies</h1>
          </Link>
          <div>
            <input placeholder="Search For Movies....." onChange={this.updateSearch} value={this.state.searchInput} onKeyPress={(event) => event.key === "Enter" && this.searchMovie()}></input>
            <button onClick={this.searchMovie}>
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 513.28 513.28">
                  <path d="M495.04,404.48L410.56,320c15.36-30.72,25.6-66.56,25.6-102.4C436.16,97.28,338.88,0,218.56,0S0.96,97.28,0.96,217.6
                    s97.28,217.6,217.6,217.6c35.84,0,71.68-10.24,102.4-25.6l84.48,84.48c25.6,25.6,64,25.6,89.6,0
                    C518.08,468.48,518.08,430.08,495.04,404.48z M218.56,384c-92.16,0-166.4-74.24-166.4-166.4S126.4,51.2,218.56,51.2
                    s166.4,74.24,166.4,166.4S310.72,384,218.56,384z"/>
              </svg>
            </button>
          </div>
        </header>
        <section className="movie-description">
          <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} alt="poster"  onError={ this.defaultImage }/>
          <div className="title">
            <h1>{movie.title} {movie.release_dates && this.getMovieMPAA()}</h1>
            <p>Release Date: {movie.release_date}</p>
            <p>Genre: 
              {
                movie.genres && movie.genres.map((genre, index) => {
                  if(index < movie.genres.length -1 ) {
                    return <span key={genre.id}> {genre.name}, </span>
                  } else {
                    return <span key={genre.id}> {genre.name} </span>
                  }
                })
              }
            </p>
          </div>
          <div className="overview">
            <h2>Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div className="trailer">
            {
              movie.videos ?  movie.videos.results.length ? <iframe
              allowFullScreen="allowFullScreen"
              src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`} title="trailer">
            </iframe> : ""  : ""
            }
          </div>
        </section>
        {
          movie.recommendations ? movie.recommendations.results.length ? 
          <section className="recommend">
            <h2>Recommendations</h2>
            <div className="recommend-scroll">
              {
                movie.recommendations.results.map(recom => {
                  return (
                    <Link to={`/movie/${recom.id}`}  key={recom.id}>
                      <div>
                        <img src={`https://image.tmdb.org/t/p/w440_and_h660_face/` + recom.poster_path} alt="poster" onError={ this.defaultImage }/>
                      </div>
                    </Link>
                  )
                })
              }
            </div>
          </section> : "" : ""
        }
      </section>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSearchMovies: search => dispatch(fetchSearchMovies(search))
});

export default connect(null, mapDispatchToProps)(MovieDescription);