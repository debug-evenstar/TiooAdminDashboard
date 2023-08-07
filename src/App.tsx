import './App.css'
import { Suspense } from 'react';
import Sidebar from './components/sidebar/';
import { BrowserRouter as Router} from 'react-router-dom';
import AdminRouter from './pages/router';

import Loader from './components/loader/loader';

function App() {

  return (
    <main className="flex h-screen bg-white">
      <Router>
        <Sidebar />
        <div className="w-[81%] h-screen overflow-y-auto">
          <Suspense fallback={<Loader />}>
            <AdminRouter />
          </Suspense>
        </div>
      </Router>
    </main>
  )
}

export default App
