import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LoginInput = ({ onLogin }) => {
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })

  const changeFormhandler = (event) => {
    setFormLogin({
      ...formLogin,
      [event.target.id]: event.target.value
    })
  }
  return (
    <div className="form-container shadow">
        <h2>Masuk ke Akun Anda</h2>
            <form onSubmit={(event) => {
              event.preventDefault()
              onLogin(formLogin)
            }}>
                <div className="mb-3 mt-3">
                    <label htmlFor="email">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={formLogin.email} onChange={changeFormhandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">Password:</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={formLogin.password} onChange={changeFormhandler} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <p className="mt-3">Belum punya akun? <Link to="/register">Daftar di sini</Link></p>
            </form>
    </div>
  )
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default LoginInput
