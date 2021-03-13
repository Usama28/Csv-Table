import React from 'react';
import Login from './components/Login';
import CSVTable from './components/CsvTable';
import Chart from './components/Chart';
import { HashRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route path="/table" exact={true} component={CSVTable}/>
        <Route path="/chart" exact={true} component={Chart}/>
        <Route path="/" component={Login}/>
      </Switch>
    </HashRouter>
    
  );
}

export default App;
