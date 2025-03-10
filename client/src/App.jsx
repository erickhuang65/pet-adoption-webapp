import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Search from './views/Search'
import NavBar from './components/NavBar'
import './App.css'
import PetProfile from './views/PetProfile'

function App() {

  return (
    <div className='main'>
    
    <NavBar />
    
    <Routes>
      
      {/* Home Page*/}
      <Route path='/adoptapet' element={< Home />}></Route>

      {/* Search Page */}
      <Route path='/adoptapet/search' element={< Search />}></Route>

      {/* Pet Profile */}
      /* /adoptapet/search/profile/:id */
      <Route path='/adoptapet/search/profile/:id' element={< PetProfile />}></Route>
    
    </Routes>
    </div>
  )
}

export default App
