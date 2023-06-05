import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Layout } from './components/Layout';
import { Games } from './pages/Games';
import { Developers } from './pages/Developers';
import { GamePage } from './pages/GamePage'
import { DeveloperPage } from './pages/DeveloperPage';
import { Genres } from './pages/Genres';

function App() {
  return (
    <div className="w-screen h-screen">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/games/:id" element={<GamePage />} />
            <Route path="/games" element={<Games />} />
            <Route path="/developers/:id" element={<DeveloperPage />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
