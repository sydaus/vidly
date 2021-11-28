import { getMovies } from "../services/fakeMovieService";
import React, { Component } from "react";
import "font-awesome/fonts/fontawesome-webfont.svg";
import Pagination from "./common/pagination";
import Like from "./common/like";
import { paginate } from "../utlis/paginate";

class Movies extends React.Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
  };

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

  render() {
    // const value = this.state.movies.length;
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);

    if (count === 0) {
      return <span>there are no movie in the database</span>;
    } else {
      return (
        <React.Fragment>
          <span>There are {count} movies in the database</span>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={this.handleLike}
                      movie={movie}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm m2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      );
    }
  }

  // render() {
  //     return (
  //         <React.Fragment>
  //         <span>{ this.moviesNumber()}</span>
  //         <table className="table">
  //             <thead>
  //                 <tr>
  //                     <th>Title</th>
  //                     <th>Genre</th>
  //                     <th>Stock</th>
  //                     <th>Rate</th>
  //                     <th></th>
  //                 </tr>
  //             </thead>
  //             <tbody>
  //                 {this.state.movies.map(movie=> (
  //                     <tr key={movie._id}>
  //                         <td>{movie.title}</td>
  //                         <td>{movie.genre.name}</td>
  //                         <td>{movie.numberInStock}</td>
  //                         <td>{movie.dailyRentalRate}</td>
  //                         <td><button
  //                         onClick={()=>this.handleDelete(movie)}
  //                         className="btn btn-danger btn-sm m2" >Delete</button></td>
  //                     </tr>
  //                 ))}
  //             </tbody>
  //         </table>
  //         </React.Fragment>
  //     );

  // }

  // moviesNumber() {
  //     const value = this.state.movies.length;
  //     console.log(value);
  //     return value === 0 ? "there are no movies in the list" : "showing " + value + " movies in the database";
  // };
}

export default Movies;
