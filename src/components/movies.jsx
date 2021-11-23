import { getMovies} from "../services/fakeMovieService";
import React, { Component } from 'react';
import 'font-awesome/fonts/fontawesome-webfont.svg';
import Like from "./common/like";

class Movies extends React.Component {
    state = {
        movies: getMovies()
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(c => c._id !== movie._id);
        this.setState ({ movies})        
    };

    handleLike = (movie) => {
        // console.log("ghost clicked", movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    
    render() { 
        // const value = this.state.movies.length;
        const {length: value} = this.state.movies;

        if (value === 0)
        {return (         
            <span>there are no movie in the database</span>
        )}

        else
        {
        return (
            <React.Fragment>
            <span>There are {value } movies in the database</span>
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
                    {this.state.movies.map(movie=> (
                        <tr key={movie._id}>
                            <td>{movie.title}</td>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td>
                                <Like liked={movie.liked} onClick={this.handleLike} movie={movie} /> 
                            </td>
                            <td><button 
                            onClick={()=>this.handleDelete(movie)}
                            className="btn btn-danger btn-sm m2" >Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>      
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