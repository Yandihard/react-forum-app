import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncPopulateLeaderboards } from '../states/leaderboards/action'

const LeaderboardsPage = () => {
  const dispatch = useDispatch()
  const leaderboards = useSelector(state => state.leaderboards)

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards())
  }, [dispatch])

  return (
    <div className="container bg-white shadow">
      <div className="container-wrapper">
        <h2>Klasmen Pengguna Aktif</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="text-center">
              <tr>
                <td>
                  <p><b>Pengguna</b></p>
                </td>
                <td>
                  <p><b>Skor</b></p>
                </td>
              </tr>
            </thead>
            <tbody>
            {leaderboards.map(item => (
              <tr key={item.user.id}>
                <td>
                  <p><img className="img-user mx-3" src={item.user.avatar} alt="" />{item.user.name}</p>
                </td>
                <td className="text-center">
                  <p>{item.score}</p>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LeaderboardsPage
