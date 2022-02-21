import { useState, FC } from 'react'
import './App.css'
import Results from './Results'
import API from './API'

const App: FC = () => {
  const [movieTitle, setMovieTitle] = useState('')
  const [movieYear, setMovieYear] = useState('')
  const [movieList, setMovieList] = useState([])
  const [totalResult, setTotalResult] = useState(0)
  const [isThereList, setIsThereList] = useState(false)

  const submitHandler = async (e: any) => {
    e.preventDefault()
    const response = await fetch(URL)
    const { Search, totalResults, Response } = await response.json()
    if (Response === 'True') {
      setMovieList(Search)
      setTotalResult(Number(totalResults))
      setIsThereList(true)
    } else {
      setMovieList([])
      setTotalResult(0)
      setIsThereList(false)
    }
    setMovieTitle('')
    setMovieYear('')
  }

  const URL = `${API}s=${movieTitle}&y=${movieYear}`

  return (
    <div className='App'>
      <h1>React and TypeScript</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor='title'>
          Movie Title :{' '}
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Movie Title'
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </label>
        <label htmlFor='year'>
          Movie Year :{' '}
          <input
            type='text'
            name='title'
            id='title'
            placeholder='Movie Year'
            value={movieYear}
            onChange={(e) => setMovieYear(e.target.value)}
          />
        </label>
        <button>Search</button>
      </form>
      <Results
        isThereList={isThereList}
        totalResult={totalResult}
        movieList={movieList}
      />
    </div>
  )
}

export default App
