import { Route, Routes, Link } from 'react-router-dom'
import Home from './home'
import Optimized from './optimized'
import Unoptimized from './unoptimized'

export default function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <div>
            <Link to='/optimized'>To Optimized</Link>
            <br />
            <Link to='/unoptimized'>To Unoptimized</Link>
            <Home />
          </div>
        }
      />
      <Route
        path='/optimized'
        element={
          <div>
            <Link to='/'>To Home</Link>
            <Optimized />
          </div>
        }
      />
      <Route
        path='/unoptimized'
        element={
          <div>
            <Link to='/'>To Home</Link>
            <Unoptimized />
          </div>
        }
      />
    </Routes>
  )
}
