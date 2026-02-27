import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import matchers from '@testing-library/jest-dom/matchers'
import { MemoryRouter } from 'react-router-dom'
import LoginInput from './LoginInput'
/**
 * test scenario for LoginInput component
 *
 * - LoginInput component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
expect.extend(matchers)

describe('LoginInput component', () => {
  it('should handle username typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <LoginInput onLogin={() => {}} />
      </MemoryRouter>
    )
    const emailInput = await screen.getByPlaceholderText('Enter email')

    // Action
    await userEvent.type(emailInput, 'user@test.com')

    // Assert
    expect(emailInput.value).toBe('user@test.com')
  })

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
        <MemoryRouter>
            <LoginInput onLogin={() => {}} />
        </MemoryRouter>
    )
    const passwordInput = await screen.getByPlaceholderText('Enter password')

    // Action
    await userEvent.type(passwordInput, 'passwordtest')

    // Assert
    expect(passwordInput).toHaveValue('passwordtest')
  })
})
