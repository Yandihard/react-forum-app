import React from 'react'
import { describe, it, expect, vi } from 'vitest'
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
    render(
      <MemoryRouter>
        <LoginInput onLogin={() => {}} />
      </MemoryRouter>
    )
    const emailInput = await screen.getByPlaceholderText('nama@email.com')

    await userEvent.type(emailInput, 'user@test.com')

    expect(emailInput.value).toBe('user@test.com')
  })

  it('should handle password typing correctly', async () => {
    render(
        <MemoryRouter>
            <LoginInput onLogin={() => {}} />
        </MemoryRouter>
    )
    const passwordInput = await screen.getByPlaceholderText('••••••••')

    await userEvent.type(passwordInput, 'passwordtest')

    expect(passwordInput).toHaveValue('passwordtest')
  })

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn()

    render(
      <MemoryRouter>
        <LoginInput onLogin={mockLogin} />
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('nama@email.com')
    await userEvent.type(emailInput, 'user@test.com')

    const passwordInput = screen.getByPlaceholderText('••••••••')
    await userEvent.type(passwordInput, 'passwordtest')

    const loginButton = screen.getByRole('button', { name: /masuk/i })
    await userEvent.click(loginButton)

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'passwordtest'
    })
  })
})
