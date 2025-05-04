
import Navbar from './components/Navbar';
import KpiFormCarrusel from './components/forms/KpiFormCarousel'

function App() {


  return (
    <div className="min-h-screen bg-bg dark:bg-bg-dark text-text dark:text-text-dark transition-colors">
      <Navbar />
      <div className="p-6">
          <KpiFormCarrusel />
        </div>
    </div>
  );
}

export default App;
