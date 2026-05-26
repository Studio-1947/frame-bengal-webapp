import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Infographic from './pages/Infographic'
import Fellows from './pages/Fellows'
import FellowProfile from './pages/FellowProfile'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infographic" element={<Infographic />} />
        <Route path="/fellows" element={<Fellows />} />
        <Route path="/fellows/:id" element={<FellowProfile />} />
      </Routes>
      <Footer />
    </>
  )
}
