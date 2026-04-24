import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MdTitle, MdCategory, MdDescription } from 'react-icons/md'

const ThreadInput = ({ onAddThread }) => {
  const [formThread, setformThread] = useState({
    title: '',
    category: '',
    body: ''
  })
  const [error, setError] = useState('')

  const changeFormhandler = (event) => {
    setformThread({
      ...formThread,
      [event.target.id]: event.target.value
    })
    if (error) setError('')
  }

  function handleSubmit (event) {
    event.preventDefault()
    const { title, category, body } = formThread

    if (!title || !category || !body) {
      setError('Semua field harus diisi!')
      return
    }
    onAddThread({ title, category, body })
  }

  return (
    <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-all duration-300">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Buat Diskusi Baru ✨</h2>
        <p className="text-slate-500 dark:text-slate-400">Mulailah percakapan dan bagikan pengetahuanmu</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm animate-shake">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Judul Diskusi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdTitle className="text-slate-400" size={20} />
            </div>
            <input 
              type="text" 
              id="title" 
              value={formThread.title} 
              onChange={changeFormhandler}
              className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="Apa yang ingin kamu bahas?" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Kategori</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <MdCategory className="text-slate-400" size={20} />
            </div>
            <input 
              type="text" 
              id="category" 
              value={formThread.category} 
              onChange={changeFormhandler}
              className="block w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="e.g. react, javascript, ui-design" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Isi Diskusi</label>
          <div className="relative">
            <div className="absolute top-4 left-4 pointer-events-none">
              <MdDescription className="text-slate-400" size={20} />
            </div>
            <textarea 
              id="body" 
              rows="6" 
              data-testid="body-input"
              value={formThread.body} 
              onChange={changeFormhandler}
              className="block w-full pl-11 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all min-h-[150px]"
              placeholder="Ceritakan secara detail tentang diskusi ini..."
            />
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <button 
            type="submit" 
            className="flex-1 py-4 px-6 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Publikasikan Sekarang
          </button>
          <button 
            type="button"
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired
}

export default ThreadInput
