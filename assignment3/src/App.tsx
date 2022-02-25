// module imports
import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'

// custom imports
import './App.css'
import HomeScreen from './screens/HomeScreen'

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1>OMDB App</h1>
        <Routes>
          <Route path='/' element={<HomeScreen />} />
        </Routes>
      </div>
    )
  }
}
