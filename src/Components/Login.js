import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

export const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const submit = async () => {

    const url = "https://hbauth.herokuapp.com/login";
    const data = { username, password }
    try {
      await axios.post(url, data).then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          alert('successfully login')
        }
      })
    }
    catch (error) {
      setError('Invalid Login');
      return;
    };
  };

  const cancel = () => {
    setUsername('');
    setPassword('');
  }



  return (
    <div>

      <section className="vh-100" style={{ "backgroundColor": "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ "borderRadius": "1rem" }}>
                <div className="card-body p-5 text-center">
                  {error && (
                    <Alert className="error"> {error} </Alert>
                  )}
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="typeEmailX-2">Username</label>
                    <input placeholder="Enter Username" type="text" id="typeEmailX-2" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control form-control-lg" />

                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" for="typePasswordX-2">Password</label>
                    <input type="password" placeholder="Enter Password" id="typePasswordX-2" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />

                  </div>



                  <button onClick={submit} data-testid="submit" className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                  <button onClick={cancel} data-testid="reset" className="btn btn-warning btn-lg btn-block" style={{ marginLeft: '35px' }} type="submit">Cancel</button>

                  <hr class="my-4" />



                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
