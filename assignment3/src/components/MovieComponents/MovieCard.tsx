// module imports
import { Component } from 'react'


interface Movie {
  Poster: string
  Title: string
}

export class MovieCard extends Component<Movie> {
  static defaultProps = { Poster: '', Title: '' }

  render() {
    return (
      <li>
        <img src={this.props.Poster} alt={this.props.Title} />
        <p>Title: {this.props.Title}</p>
      </li>
    )
  }
}

export default MovieCard
