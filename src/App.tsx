import './App.css'
import Sidebar from './components/sidebar/';
import Home from './pages/home';

function App() {

  return (
    <main className="flex h-screen bg-white">
      <Sidebar/>
      <div className="w-[81%] h-screen overflow-y-auto">
        <Home/>
      </div>
    </main>
  )
}

export default App
