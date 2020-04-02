import React, { Component } from "react";
import Header from "../header/Header"
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchFilterMovies } from "../../thunks/fetchFilterMovies";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      navCss: false
    };
  }

  componentDidMount() {
    if(this.props.filter !== "search") {
      this.getMoviesByFilter("now_playing");
    }
    window.addEventListener("scroll", this.handleScroll, { passive: true});
  }

  handleScroll = event => {
    let { navCss } = this.state;
    let scrollPosition = event.target.scrollingElement.scrollTop;
    if(scrollPosition > 560 && !navCss) {
      this.setState({
        navCss: true
      });
    }
    if(scrollPosition <= 560 && navCss) {
      this.setState({
        navCss: false
      });
    }
  }

  getMoviesByFilter = filter => {
    this.props.fetchFilterMovies(filter);
  }

  defaultImage = event => {
    event.target.src = "https://solomono.net/images/default.png";
  }

  render() {
    let { movies, filter} = this.props;
    let { navCss } = this.state;
    return (
      <div>
        <Header />
        <main>
          <section className="search-container">
            <div>
              <h2>Welcome</h2>
              <h2>View Movies Playing Now, Popular, or Top Rated.</h2>
            </div>
          </section>
          <section className="filter-nav">
            <nav className={ navCss && "scroll" }>
              <button 
                onClick={() => this.getMoviesByFilter("now_playing")}
                className={ filter === "now_playing" ? "selected" : "" }
              >Now Playing</button>
              <button 
                onClick={() => this.getMoviesByFilter("popular")}
                className={ filter === "popular" ? "selected" : "" }
              >Popular</button>
              <button 
                onClick={() => this.getMoviesByFilter("top_rated")}
                className={ filter === "top_rated" ? "selected" : "" }
              >Top Rated</button>
            </nav>
          </section>
          <section className="movie-container">
            {
              movies.length ? movies.map(movie => {
                return (
                  <Link to={`/movie/${movie.id}`}  key={movie.id}>
                    <div className="movie-card">
                      <img src={"https://image.tmdb.org/t/p/w440_and_h660_face/" + movie.poster_path} alt="poster" onError={ this.defaultImage }/>
                      <div className="movie-text">
                        <h3>{movie.title}</h3>
                        <h4>{movie.release_date}</h4>
                      </div>
                    </div>
                  </Link>
                )
                
              }) :
              <div className="search-error">
                <p>No Movies Found For Search</p>
              </div>
            }
          </section>
        </main>
      </div>
    )
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  filter: state.filter
});

const mapDispatchToProps = dispatch => ({
  fetchFilterMovies: filter => dispatch(fetchFilterMovies(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);