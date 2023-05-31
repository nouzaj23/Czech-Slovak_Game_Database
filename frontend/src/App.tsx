import { BrowserRouter as Router } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Homepage />
    </Router>
  );
}

export default App;
