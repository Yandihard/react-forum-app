import React from 'react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useDispatch, useSelector } from 'react-redux'
import LeaderboardsPage from './LeaderboardsPage'
import { asyncPopulateLeaderboards } from '../../application/store/leaderboards/action'
/**
 * test scenario for LeaderboardsPage component
 *
 * - LeaderboardsPage component
 *   - should dispatch asyncPopulateLeaderboards when component mounted
 *   - should render leaderboards data correctly
 */
// mock react-redux
vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn()
}))

// mock thunk
vi.mock('../../application/store/leaderboards/action', () => ({
  asyncPopulateLeaderboards: vi.fn()
}))

describe('LeaderboardsPage component', () => {
  const fakeLeaderboards = [
    {
      user: {
        id: 'user-1',
        name: 'Yandi',
        avatar: 'avatar1.png'
      },
      score: 100
    },
    {
      user: {
        id: 'user-2',
        name: 'Delvi',
        avatar: 'avatar2.png'
      },
      score: 80
    }
  ]

  beforeEach(() => {
    useDispatch.mockReturnValue(vi.fn())
    useSelector.mockImplementation((selector) =>
      selector({
        leaderboards: fakeLeaderboards
      })
    )
  })

  it('should dispatch asyncPopulateLeaderboards when component mounted', () => {
    // Arrange
    const dispatchMock = vi.fn()
    useDispatch.mockReturnValue(dispatchMock)
    asyncPopulateLeaderboards.mockReturnValue({
      type: 'TEST'
    })

    // Action
    render(<LeaderboardsPage />)

    // Assert
    expect(dispatchMock).toHaveBeenCalledWith(
      asyncPopulateLeaderboards()
    )
  })

  it('should render leaderboards data correctly', () => {
    // Arrange
    render(<LeaderboardsPage />)

    // Assert
    expect(screen.getByText('Yandi')).toBeInTheDocument()
    // Score displayed with toLocaleString - check partial match
    expect(screen.getByText('100')).toBeInTheDocument()

    expect(screen.getByText('Delvi')).toBeInTheDocument()
    expect(screen.getByText('80')).toBeInTheDocument()
  })
})
