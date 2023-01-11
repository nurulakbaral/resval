import { Route, Routes, Link } from 'react-router-dom'
import Home from './home'
import Resval from './resval'
import Benchmark from './benchmark'

export default function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <div>
            <Link to='/resval'>To Resval</Link>
            <Home />
          </div>
        }
      />
      <Route
        path='/resval'
        element={
          <div>
            <Link to='/'>To Home</Link>
            <Resval />
          </div>
        }
      />
      <Route
        path='/benchmark'
        element={
          <div>
            <Link to='/'>To Home</Link>
            <Benchmark />
          </div>
        }
      />
    </Routes>
  )
}
