import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { setUserSession } from './Utils/Common';
import {useHistory} from 'react-router-dom';

function Login(props) {
      const history = useHistory();
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(null);
  const registerUsername = useFormInput('');
  const registerPassword = useFormInput('');
  // handle button click of login form
  const handleLogin = () => {
    // if(window.localStorage.getItem("accessToken")){
    //   props.history.push('/dashboard');
    // }
    setError(null);
    setLoading(true);
    console.log("username", username.value);
    console.log("password", password.value);
    axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
      let token = JSON.stringify(response.data.token)
      // let usernames = JSON.stringify(response.data.user.username)
      window.localStorage.setItem("accessToken",token)
      window.localStorage.setItem("username", response.data.user.username)  
    setLoading(false);
      setUserSession(response.data.token, response.data.user);
      // props.history.push('/dashboard');
      history.push('/');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  const handleRegister = () => {
    setErrors(null);
    setLoading(true);
    axios.post('http://localhost:4000/signup', { username: registerUsername.value, password: registerPassword.value}).then(response => {
      let token = JSON.stringify(response.data.token)
      window.localStorage.setItem("accessToken",token)
      window.localStorage.setItem("username", response.data.user.username)
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      // props.history.push('/');
      history.push('/');
    }).catch(error => {
      setLoading(false);
      console.log(error.response, 'eeeeeeeeeeerrrrrrrrrrr');
      if(error.response.status === 401) setErrors(error.response.data.message);
      else setErrors("Something went wrong. Please try again later.");
    })
  }

  return (
        <div className='covering'>
    <div className='outer_form'>
        <form className='right_form'>
            <div >
              Register<br /><br />
              <div>
                Username<br />
                <input type="text" {...registerUsername} autoComplete="new-password" />
              </div>
              <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...registerPassword} autoComplete="new-password" />
              </div>
              {errors && <><small style={{ color: 'red' }}>{errors}</small><br /></>}<br />
              <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleRegister} disabled={loading} /><br />
            </div>
        </form>
        <div className="middle_div">

        </div>
        <form className='left_form'>
            <div >
              Login<br /><br />
              <div>
                Username<br />
                <input type="text" {...username} autoComplete="new-password" />
              </div>
              <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
              </div>
              {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
              <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
            </div>
        </form>
    </div>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;