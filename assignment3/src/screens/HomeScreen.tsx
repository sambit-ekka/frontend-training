// module imports
import { Component } from 'react'
import API from '../API/API'

// custom imports
import MovieList from '../components/MovieComponents/MovieList'
import Pagination from '../components/Pagination/Pagination'
import seederList from '../seederList'

export class HomeScreen extends Component {
  state: {
    movieTitle: string
    Search: {
      Title: string
      Poster: string
    }[]
    postsPerPage: number
    currentPage: number
    totalResults: string
    Response: 'True' | 'False'
  } = {
    movieTitle: '',
    Search: seederList,
    postsPerPage: 5,
    currentPage: 1,
    totalResults: '',
    Response: 'False',
  }

  submitHandler = async (e: any) => {
    e.preventDefault()
    const response = await fetch(`${API}s=${this.state.movieTitle}`)
    const { Search, totalResults, Response } = await response.json()
    this.setState({ loading: false })
    const parsedSearch = Search.map(
      (movie: { Title: string; Poster: String }) => {
        return {
          Title: movie.Title,
          Poster: movie.Poster,
        }
      }
    )
    this.setState({ Search: parsedSearch, totalResults, Response })
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage
    const currentPosts = this.state.Search.slice(
      indexOfFirstPost,
      indexOfLastPost
    )
    const paginate = (pageNumber: number) =>
      this.setState({ currentPage: pageNumber })

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label htmlFor='title'>
            Movie Title :{' '}
            <input
              type='text'
              name='title'
              id='title'
              placeholder='Movie Title'
              value={this.state.movieTitle}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.setState({ movieTitle: e.currentTarget.value })
              }}
            />
          </label>
          <button>Search</button>
        </form>
        <MovieList movieList={currentPosts} />
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.Search.length}
          paginate={paginate}
        />
      </div>
    )
  }
}

export default HomeScreen
