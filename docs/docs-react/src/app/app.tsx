import { Route, Routes, Link } from 'react-router-dom'
import Home from './home'
import About from './about'
import TestField from './__test__'

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
      <Route
        path='/__test__'
        element={
          <div>
            <Link to='/'>Test Field</Link>
            <TestField />
          </div>
        }
      />
    </Routes>
  )
}
