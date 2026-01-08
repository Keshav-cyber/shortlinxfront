import './App.css'
import Center from './assets/components/Center.jsx';
import Nav from './assets/components/Nav';
import Blog from './assets/components/blog.jsx';
import RedirectHandle from './assets/components/RedirectHandler';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main className="pt-10 px-4">
          <Routes>
            <Route path="/" element={<Center />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/:urlCode" element={<RedirectHandle />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
