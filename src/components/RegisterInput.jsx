import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const RegisterInput = ({ onRegister }) => {
  const [formRegister, setFormRegister] = useState({
    name: '',
    email: '',
    password: ''
  })

  const changeFormhandler = (event) => {
    setFormRegister({
      ...formRegister,
      [event.target.id]: event.target.value
    })
  }

  function handleSubmit (event) {
    event.preventDefault()

    const { name, email, password } = formRegister

    if (!name || !email || !password) {
      alert('Semua field harus diisi!')
      return
    }

    if (password.length < 6) {
      alert('Password harus memiliki minimal 6 karakter!')
      return
    }
    onRegister(name, email, password)
  }

  return (
    <div className="form-container shadow">
      <h2>Daftar Akun Baru</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" value={formRegister.name} onChange={changeFormhandler} />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email">Email:</label>
          <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={formRegister.email} onChange={changeFormhandler} />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password:</label>
          <input type="password" className="form-control" id="password" placeholder="Enter password" name="password" value={formRegister.password} onChange={changeFormhandler} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <p className="mt-3">Sudah punya akun? <Link to="/">Login di sini.</Link></p>
      </form>
    </div>
  )
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired
}

export default RegisterInput
