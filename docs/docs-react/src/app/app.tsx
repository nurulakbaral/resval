import { Route, Routes, Link } from 'react-router-dom'
import Home from './home'
import Resval from './resval'

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
    </Routes>
  )
}
