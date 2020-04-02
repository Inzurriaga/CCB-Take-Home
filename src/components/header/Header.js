import React, { Component } from "react";
import { fetchSearchMovies } from "../../thunks/fetchSearchMovies";
import { connect } from "react-redux";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      headerCss: false,
      searchInput: ""
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  updateSearch = event => {
    this.setState({
      searchInput: event.target.value
    });
  }

  searchMovie = () => {
    this.props.fetchSearchMovies(this.state.searchInput);
  }

  handleScroll = event => {
    let { headerCss } = this.state;
    let scrollPosition = event.target.scrollingElement.scrollTop;
    if(scrollPosition > 50 && !headerCss) {
      this.setState({
        headerCss: true
      });
    }
    if(scrollPosition <= 50 && headerCss) {
      this.setState({
        headerCss: false
      });
    }
  }

  render() {
    return (
      <header className={this.state.headerCss ? "scroll" : ""}>
        <h1>Movies</h1>
        <div>
          <input placeholder="Search For Movies....." onChange={this.updateSearch} value={this.state.searchInput} onKeyPress={event => event.key === "Enter" && this.searchMovie()}></input>
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
    );
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSearchMovies: search => dispatch(fetchSearchMovies(search))
})

export default connect(null, mapDispatchToProps)(Header);