import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncPopulateLeaderboards } from '../../application/store/leaderboards/action'
import { Helmet } from 'react-helmet'
import { MdEmojiEvents } from 'react-icons/md'

const LeaderboardsPage = () => {
  const dispatch = useDispatch()
  const leaderboards = useSelector(state => state.leaderboards)

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards())
  }, [dispatch])

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <Helmet>
        <title>Leaderboard - Forumify</title>
      </Helmet>

      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-500/20 rounded-2xl mb-4 text-amber-600 dark:text-amber-400">
          <MdEmojiEvents size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Papan Peringkat</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Pengguna paling aktif di Forumify</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span>Pengguna</span>
            <span>Skor</span>
          </div>
        </div>

        <div className="divide-y divide-slate-50 dark:divide-slate-700">
          {leaderboards.map((item, index) => (
            <div 
              key={item.user.id} 
              className={`flex items-center justify-between p-6 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50 ${index === 0 ? 'bg-amber-50/30 dark:bg-amber-500/5' : ''}`}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-700 shadow-sm object-cover" src={item.user.avatar} alt={item.user.name} />
                  {index < 3 && (
                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${index === 0 ? 'bg-amber-400' : index === 1 ? 'bg-slate-400' : 'bg-orange-400'}`}>
                      {index + 1}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">{item.user.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{item.user.email}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">{item.score.toLocaleString()}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeaderboardsPage
