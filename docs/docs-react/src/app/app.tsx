import { Route, Routes, Link } from 'react-router-dom'
import Home from './home'
import TestFieldV0 from './__test-v0__'
import TestFieldV1 from './__test-v1__'
import Bench from './benchmarking'

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
        path='/__test-v0__'
        element={
          <div>
            <Link to='/'>Home</Link>
            <TestFieldV0 />
          </div>
        }
      />
      <Route
        path='/__test-v1__'
        element={
          <div>
            <Link to='/'>Home</Link>
            <TestFieldV1 />
          </div>
        }
      />
      <Route
        path='/benchmarking'
        element={
          <div>
            <Link to='/'>Home</Link>
            <Bench />
          </div>
        }
      />
    </Routes>
  )
}
