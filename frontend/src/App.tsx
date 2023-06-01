import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Layout } from './components/Layout';

function App() {
  return (
    <div className="w-screen h-screen">
      <Router>
        <Layout>
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
