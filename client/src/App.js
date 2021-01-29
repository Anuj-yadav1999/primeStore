import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Header from './Header';
import Advt from './Advt';
import Checkout from './Checkout';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';
import Nav from './mv/nav';
import Results from './mv/Results';
import requests from './mv/requests';
import Login from './Login';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

const promise = loadStripe('pk_test_51HaaRRFqyVkeMqlK9p5dXPA9oddDlHnZZ0MKVnkhpkghvLC7ZRazBMtkq0zHlyt5lmmJqDUuCcFWcaIh5PIExFmN00BGMktY1d');

function App() {
  // const history = useHistory();
  const [authLoading, setAuthLoading] = useState(true);
  const [ {}, dispatch] = useStateValue();
  const [selectedOption, setSelectedOption] = useState(requests.fetchTrending);

  useEffect(() => {
    if(window.localStorage.getItem("accessToken")){
      setUserSession(window.localStorage.getItem("accessToken"), window.localStorage.getItem("username"));
      setAuthLoading(false);
      // history.push('/');
      // props.history.push('/');
      return;
    }

    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }


  return (
    <Router>
      <div className="App">
        <Switch>

        <PublicRoute path='/login' >
            <Header />
            <Login  />
          </PublicRoute>

          <Route path='/payment'>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path='/prime'>
            <Header />
            <Nav setSelectedOption={setSelectedOption} />
            <Results selectedOption={selectedOption} />
          </Route>

          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>

          <Route path='/cart'>
            <Header  />
            <Checkout  />
          </Route>

          <Route path='/'>
            <Header />
            <Advt />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
