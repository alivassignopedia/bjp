import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Events from './pages/Events.jsx'
import Contact from './pages/Contact.jsx'
import Complain from './pages/Complain.jsx'
export default function App() {
  return (
    <Routes>
      {/* Layout renders Navbar + <Outlet/> + Footer + floating call/WhatsApp buttons */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="events" element={<Events />} />
        <Route path="contact" element={<Contact />} />
        <Route path="complain" element={<Complain />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}