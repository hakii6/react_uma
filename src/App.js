import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ChampMeet from './components/champMeet/ChampMeet';

import ENV from './env';

const App = () => {
  const [data, setData] = useState("");


  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={ChampMeet} />
          <Route path="/champMeet" component={ChampMeet} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
};
export default App;