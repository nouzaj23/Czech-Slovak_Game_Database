import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Layout } from './components/Layout';
import { Games } from './pages/Games';
import { Developers } from './pages/Developers';
import { GamePage } from './pages/GamePage'
import { DeveloperPage } from './pages/DeveloperPage';
import { Genres } from './pages/Genres';
import { SearchResults } from './pages/SearchResults';
import { WishList } from './pages/Wishlist';
import { AdminPage } from './pages/AdminPage';
import { IsLogged } from './components/Authorized';

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
            <Route path="/search/:query" element={<SearchResults />} />
            <Route path="*" element={<div>404</div>} />
            <IsLogged>
              <Route path="/wishlist" element={<WishList />} />
            </IsLogged>
            <Route path="/adminpage" element={<AdminPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
