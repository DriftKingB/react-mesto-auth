import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';

import HomePage from './HomePage';
import Register from './AuthForms/Register';
import Login from './AuthForms/Login';

import ProtectedRoute from '../utils/ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const authToken = localStorage.getItem('token');
  const [currentUser, setCurrentUser] = useState(null);

  function handleSignIn(token) {
    localStorage.setItem('token', token)
  }

  function handleSignOut() {
    localStorage.removeItem('token')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router>
        <Switch>
          <ProtectedRoute 
            authToken={authToken}
            onSignOut={handleSignOut}
            component={HomePage}
            exact
            path='/'
            setCurrentUser={setCurrentUser}  
          />
          <Route path='/sign-up'>
            <Register />
          </Route>
          <Route path='/sign-in'>
            <Login
              onSignIn={handleSignIn}
            />            
          </Route>
        </Switch>
      </Router>
    </CurrentUserContext.Provider>
  );
}

