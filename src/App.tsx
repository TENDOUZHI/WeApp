import '@/App.scss'
import { Provider, useSelector } from 'react-redux'
import { store } from './store'
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { WorkSpace } from './pages/WorkSpace'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

function App() {
  
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/workspace' element={<WorkSpace />}></Route>
        </Routes>
      </Router>
    </Provider>

  )
}

export default App
