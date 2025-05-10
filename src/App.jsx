
import Navbar from './components/Navbar';
import KpiFormCarrusel from './components/forms/KpiFormCarousel'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import TutorialHome from './pages/TutorialHome';
import { Analytics } from "@vercel/analytics/react"

function App() {


  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors">
      <div className="">
      <Analytics/>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<TutorialHome />} />
            <Route path="/configuracion" element={<KpiFormCarrusel />} />
          </Routes>
        </Router>
        </div>
    </div>
  );
}

export default App;
