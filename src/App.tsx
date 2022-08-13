import { useState } from 'react'
import reactLogo from './assets/react.svg'
import '@/App.scss'
import { Provider } from 'react-redux'
import { store } from './store'
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Home } from './pages/Home'
import { Ingredients } from './components/molecules/Ingredients'
import { Structure } from './components/molecules/Structure'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
      </Router>
    </Provider>

  )
}

export default App
