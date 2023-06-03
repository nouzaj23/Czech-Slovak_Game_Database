import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Layout } from './components/Layout';
import { Games } from './pages/Games';
import { Developers } from './pages/Developers';
import { GamePage } from './pages/GamePage'

function App() {
  return (
    <div className="w-screen h-screen">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route path="/developers">
              <Developers />
            </Route>
            <Route path="/game/:id">
              <GamePage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
