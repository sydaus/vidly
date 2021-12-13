import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import React, { Component } from "react";
import "font-awesome/fonts/fontawesome-webfont.svg";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "../utlis/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    // selectedGenre: null,
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((c) => c._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    // console.log("ghost clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (path) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.setState({ sortColumn });
  };

  render() {
    // const value = this.state.movies.length;
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies,
    } = this.state;

    const filtered =
      // selectedGenre && selectedGenre.name != "All Genres"
      // the line below is better with the same function of the line above
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    // const sorted = sortColumn
    //   ? filtered.sort((a, b) => b.sortColumn - a.sortColumn)
    //   : filtered;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    if (count === 0) {
      return <span>there are no movie in the database</span>;
    }
    // else {
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            // textProperty="name"
            // valueProperty="_id"
            // the two line above were moved to child conponent as defaultProps
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <span>There are {filtered.length} movies in the database</span>
          <MoviesTable
            movies={movies}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
    // }
  }
}

export default Movies;
