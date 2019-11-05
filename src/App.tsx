import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Hello E2E test</h1>
      </div>

      <Switch>
        <Route path="/about">
          <h2>About page</h2>
          <br />
          {/* <Link to="/">Go to home</Link> */}
        </Route>
        <Route path="/">
          <h2>Home page</h2>
          <br />
          <Link to="/about">Go to about</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
