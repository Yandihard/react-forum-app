import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ThreadInput = ({ onAddThread }) => {
  const [formThread, setformThread] = useState({
    title: '',
    category: '',
    body: ''
  })

  const changeFormhandler = (event) => {
    setformThread({
      ...formThread,
      [event.target.id]: event.target.value
    })
  }

  function handleSubmit (event) {
    event.preventDefault()

    const { title, category, body } = formThread

    if (!title || !category || !body) {
      alert('Semua field harus diisi!')
      return
    }
    onAddThread(title, category, body)
  }

  return (
        <div className="form-container shadow">
        <h2>Buat Diskusi Baru</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2 mt-3">
                    <input type="text" className="form-control" id="title" placeholder="Judul" name="Judul" value={formThread.title} onChange={changeFormhandler} />
                </div>
                <div className="mb-2">
                    <input type="text" className="form-control" id="category" placeholder="Kategori" name="Kategori" value={formThread.category} onChange={changeFormhandler} />
                </div>
                <textarea data-testid="body-input" className="form-control mb-2" rows="5" id="body" name="text" value={formThread.body} onChange={changeFormhandler} />
                <button type="submit" className="btn btn-primary">Buat</button>
            </form>
    </div>
  )
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired
}

export default ThreadInput
