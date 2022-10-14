import '@/App.scss'
import { Provider } from 'react-redux'
import { store } from './store'
import { Source } from './Source'

function App() {
  return (
    <Provider store={store}>
      <Source/>
      {/* <Router>
        <Routes>
        <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/repository' element={<Repository/>}></Route>
          <Route path='/workspace' element={<WorkSpace />}></Route>
        </Routes>
      </Router> */}
    </Provider>

  )
}

export default App
