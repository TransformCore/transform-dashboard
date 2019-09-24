import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withAdalLoginApi } from './adalConfig';
import Loading from './elements/Loading';
import Dashboard from './Dashboard';
import Admin from './auth/Admin';

const ProtectedPage = withAdalLoginApi(
  Admin,
  () => <Loading />,
  err => console.log(err)
);

const DashboardPage = () => {
  return <Dashboard />;
};

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={DashboardPage} />
        <Route path="/admin" component={ProtectedPage} />
      </div>
    </Router>
  );
};

export default App;
