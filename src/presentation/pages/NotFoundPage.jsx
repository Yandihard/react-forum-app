import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { MdHome, MdExplore } from 'react-icons/md'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 text-center py-20">
      <Helmet>
        <title>404 - Halaman Tidak Ditemukan</title>
      </Helmet>
      
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800 animate-pulse">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Oops! Tersesat?</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
        Halaman Tidak Ditemukan
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mb-10 leading-relaxed">
        Sepertinya Anda mencoba mengakses halaman yang sudah tidak ada atau salah ketik alamat. Jangan khawatir, yuk balik lagi!
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/" 
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all active:scale-95"
        >
          <MdHome size={22} />
          Kembali ke Beranda
        </Link>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-105 transition-all active:scale-95"
        >
          <MdExplore size={22} />
          Kembali Sebelumnya
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
