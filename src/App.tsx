import {
  Home,
  Library,
  Schools,
  Students,
  Teachers,
  Freelancers,
  Marketplace
} from './pages';
import './App.css'
import Sidebar from './components/sidebar/';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <main className="flex h-screen bg-white">
      <Router>
        <Sidebar />
        <div className="w-[81%] h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/schools" element={<Schools />}></Route>
            <Route path="/freelancers" element={<Freelancers />}></Route>
            <Route path="/teachers" element={<Teachers />}></Route>
            <Route path="/students" element={<Students />}></Route>
            <Route path="/library" element={<Library />}></Route>
            <Route path="/marketplace" element={<Marketplace />}></Route>
          </Routes>
        </div>
      </Router>
    </main>
  )
}

export default App
