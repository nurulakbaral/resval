import { Route, Routes, Link } from 'react-router-dom'
import Home from './home'
import About from './about'

export default function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <div>
            <Link to='/about'>To About</Link>
            <Home />
          </div>
        }
      />
      <Route
        path='/about'
        element={
          <div>
            <Link to='/'>To Home</Link>
            <About />
          </div>
        }
      />
    </Routes>
  )
}
