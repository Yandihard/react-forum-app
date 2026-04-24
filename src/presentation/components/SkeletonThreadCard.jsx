import React from 'react'

const SkeletonThreadCard = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
      </div>
      
      <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mb-4"></div>
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default SkeletonThreadCard
