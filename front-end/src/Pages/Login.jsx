import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      })
      navigate('/')
      let token = response.data.token
      localStorage.setItem('token',token)
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 mt-5">
        <div className="card">
          <div className="card-header bg-dark text-white">
            Login
          </div>
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-group mb-2">
                <label htmlFor="email">Email :</label>
                <input type="email" className="form-control" id="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} value={email} />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} value={password} />
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
