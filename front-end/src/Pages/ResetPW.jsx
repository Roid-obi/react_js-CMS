import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const [token, setToken] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const search = useLocation().search;
  const tokenParam = new URLSearchParams(search).get('token');
  const emailParam = new URLSearchParams(search).get('email');

  const handleResetPassword = async (event) => {
    event.preventDefault();

    await axios.post(
        "http://localhost:8000/api/password/reset",
        {
          token: token,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert("Password Berhasil Di Ubah Silahkan Login");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    setToken(tokenParam)
    setEmail(emailParam)
  },[])

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Reset Password
            </div>
            <div className="card-body">
              <form onSubmit={handleResetPassword}>
                <div className="form-group mb-2">
                  <label htmlFor="token">Token :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="token"
                    placeholder="token"
                    onChange={(e) => setToken(e.target.value)}
                    value={tokenParam}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={emailParam}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="password">New Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
