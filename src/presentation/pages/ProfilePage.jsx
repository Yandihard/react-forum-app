import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { MdEmail, MdBadge, MdAlternateEmail } from 'react-icons/md'

function ProfilePage () {
  const authUser = useSelector((state) => state.authUser)

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <Helmet>
        <title>Profile - Forumify</title>
      </Helmet>
      
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 transition-all duration-300">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-full blur-xl opacity-30 animate-pulse" />
            <img 
              className="relative w-32 h-32 rounded-full border-4 border-white dark:border-slate-700 shadow-xl object-cover"
              src={authUser.avatar}
              alt={authUser.name}
            />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{authUser.name}</h2>
          <p className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-bold rounded-full border border-indigo-100 dark:border-indigo-500/20">
            Anggota Forumify
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 group transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-indigo-500 shadow-sm border border-slate-100 dark:border-slate-700">
              <MdAlternateEmail size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID Pengguna</p>
              <p className="text-slate-700 dark:text-slate-200 font-semibold">{authUser.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 group transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-indigo-500 shadow-sm border border-slate-100 dark:border-slate-700">
              <MdEmail size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alamat Email</p>
              <p className="text-slate-700 dark:text-slate-200 font-semibold">{authUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 group transition-all hover:border-indigo-200 dark:hover:border-indigo-500/30">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-indigo-500 shadow-sm border border-slate-100 dark:border-slate-700">
              <MdBadge size={24} />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</p>
              <p className="text-slate-700 dark:text-slate-200 font-semibold">{authUser.name}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-50 dark:border-slate-700/50 text-center">
          <p className="text-slate-400 text-sm italic">
            "Terima kasih telah menjadi bagian dari komunitas kami!"
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
