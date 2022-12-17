import React, { useEffect, useState } from "react";

import { Route, Switch, Redirect, useParams } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';
import MovieHeader from './components/MovieHeader';
import NewMovieForm from "./components/NewMovieForm";

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = (props) => {
     const [movies, setMovies] = useState([]);
     const [favoriteMovies, setFavoriteMovies] = useState([]);

     useEffect(() => {
          axios.get('http://localhost:9000/api/movies')
               .then(res => {
                    setMovies(res.data);
               })
               .catch(err => {
                    console.log(err);
               });
     }, []);

     const deleteMovie = (id) => {
          console.log(movies);
          setMovies(movies.filter(movie => (movie.id !== id)))
     }

     const addToFavorites = (movie) => {

     }

     console.log(movies);
     return (
          <div>
               <nav className="navbar navbar-dark bg-dark">
                    <span className="navbar-brand" > HTTP / CRUD Module Project</span>
               </nav>

               <div className="container">
                    <MovieHeader />
                    <div className="row ">
                         <FavoriteMovieList favoriteMovies={favoriteMovies} />

                         <Switch>
                              <Route path="/movies/add">
                                   <NewMovieForm setMovies={setMovies} />
                              </Route>
                              <Route path="/movies/edit/:id">
                                   <EditMovieForm setMovies={setMovies} />
                              </Route>

                              <Route path="/movies/:id">
                                   <Movie deleteMovie={deleteMovie} />
                              </Route>

                              <Route path="/movies">
                                   <MovieList movies={movies} />
                              </Route>

                              <Route path="/">
                                   <Redirect to="/movies" />
                              </Route>
                         </Switch>
                    </div>
               </div>
          </div>
     );
};


export default App;

