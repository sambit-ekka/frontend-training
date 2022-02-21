import { useState } from 'react'
import MovieCard from './MovieCard'
import Pagination from './Pagination'

interface Result {
  isThereList: boolean
  totalResult: number
  movieList: any
}

const Results = ({ isThereList, totalResult, movieList }: Result) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(1)

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = movieList.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <>
      {isThereList ? (
        <>
          <h2>Movie List</h2>
          <p>Total Result: {totalResult}</p>
          <ul className='results'>
            {currentPosts.map(
              ({
                Poster,
                Title,
                Type,
                Year,
                imdbID,
              }: {
                Poster: string
                Title: string
                Type: string
                Year: number
                imdbID: string
              }) => (
                <MovieCard
                  Poster={Poster}
                  Title={Title}
                  Type={Type}
                  Year={String(Year)}
                  key={imdbID}
                  ID={imdbID}
                />
              )
            )}
          </ul>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={movieList.length}
            paginate={paginate}
          />
        </>
      ) : (
        <h2>No movies to show</h2>
      )}
    </>
  )
}

export default Results
