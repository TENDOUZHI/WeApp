import '@/App.scss'
import { Provider } from 'react-redux'
import { store } from './store'
import { Source } from './Source'

function App() {
  return (
    <Provider store={store}>
      <Source/>
    </Provider>

  )
}

export default App
