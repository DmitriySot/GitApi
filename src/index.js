import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import UserList from './components/UserList'
import LocationForm from './components/LocationForm'
import './styles.css'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LocationForm />
        <UserList />
      </div>
    </Provider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
