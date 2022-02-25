// module imports
import { Component } from 'react'

// custom imports
import MovieCard from './MovieCard'

type Movies = {
  movieList: {
    Title: string
    Poster: string
  }[]
}

export class MovieList extends Component<Movies> {
  static defaultProps = { movieList: [] }

  render() {
    return (
      <ul>
        <h1>Movie List</h1>
        {this.props.movieList.map((movie) => (
          <MovieCard
            Poster={movie.Poster}
            Title={movie.Title}
            key={movie.Title}
          />
        ))}
      </ul>
    )
  }
}

export default MovieList
