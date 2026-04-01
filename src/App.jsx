import { Routes, Route } from 'react-router';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
   <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
   </>
  )
}

export default App
