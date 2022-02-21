import { FC, useEffect, useState } from 'react'
import Modal from './Modal'
import API from './API'

interface Movie {
  Poster: string
  Title: string
  Type: string
  Year: string
  ID: string
}

interface Details {
  Actors: string
  Country: string
  Director: string
  Genre: string
  Language: string
  Released: string
  Title: string
  Type: string
  Year: string
  imdbRating: string
}

const MovieCard: FC<Movie> = ({ Poster, Title, Type, Year, ID }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [info, setInfo]: [info: Details, setInfo: Function] = useState({
    Actors: '',
    Country: '',
    Director: '',
    Genre: '',
    Language: '',
    Released: '',
    Title: '',
    Type: '',
    Year: '',
    imdbRating: '',
  })

  const URL = `${API}&i=${ID}`

  useEffect(() => {
    const getDetails = async (URL: string) => {
      console.log(URL)
      const response = await fetch(URL)
      const parsedResponse = await response.json()
      setInfo(parsedResponse)
      setLoading(false)
    }

    getDetails(URL)
  }, [URL])

  return (
    <li className='movie-card'>
      <img src={Poster} alt={Title} />
      <div className='movie-card--details'>
        <p>Title: {Title}</p>
        <p>Type: {Type}</p>
        <p>Year: {Year}</p>
        <button onClick={() => setIsOpen(true)}>More Info &rarr;</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>Title: {info.Title}</p>
              <p>Year: {info.Year}</p>
              <p>Type: {info.Type}</p>
              <p>Actors: {info.Actors}</p>
              <p>Country: {info.Country}</p>
              <p>Director: {info.Director}</p>
              <p>Genre: {info.Genre}</p>
              <p>Language: {info.Language}</p>
              <p>Released: {info.Released}</p>
              <p>IMdbRating: {info.imdbRating}</p>
              <p>
                {parseFloat(info.imdbRating) >= 7.0
                  ? 'boxoffice: hit'
                  : 'boxoffice: flop'}
              </p>
            </>
          )}
        </Modal>
      </div>
    </li>
  )
}

export default MovieCard
