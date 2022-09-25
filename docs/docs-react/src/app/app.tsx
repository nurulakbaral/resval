import { Route, Routes, Link } from 'react-router-dom'
import Home from './home'
import About from './about'
import TestField from './__test__'
import V1 from './v1'

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
            <Link to='/'>Home</Link>
            <TestField />
          </div>
        }
      />
      <Route
        path='/v1'
        element={
          <div>
            <Link to='/'>Home</Link>
            <V1 />
          </div>
        }
      />
    </Routes>
  )
}
