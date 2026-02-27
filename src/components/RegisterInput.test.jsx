import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import RegisterInput from './RegisterInput'
/**
 * test scenario for RegisterInput component
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */
describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>
    )

    const nameInput = screen.getByLabelText('Name:')

    // Action
    await userEvent.type(nameInput, 'Yandi')

    // Assert
    expect(nameInput.value).toBe('Yandi')
  })

  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>
    )

    const emailInput = screen.getByLabelText('Email:')

    // Action
    await userEvent.type(emailInput, 'yandi@test.com')

    // Assert
    expect(emailInput.value).toBe('yandi@test.com')
  })

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>
    )

    const passwordInput = screen.getByLabelText('Password:')

    // Action
    await userEvent.type(passwordInput, 'password123')

    // Assert
    expect(passwordInput.value).toBe('password123')
  })

  it('should call onRegister function when form submitted correctly', async () => {
    // Arrange
    const mockRegister = vi.fn()

    render(
      <MemoryRouter>
        <RegisterInput onRegister={mockRegister} />
      </MemoryRouter>
    )

    const nameInput = screen.getByLabelText('Name:')
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const registerButton = screen.getByRole('button', { name: 'Register' })

    // Action
    await userEvent.type(nameInput, 'Yandi')
    await userEvent.type(emailInput, 'yandi@test.com')
    await userEvent.type(passwordInput, 'password123')

    await userEvent.click(registerButton)

    // Assert
    expect(mockRegister).toHaveBeenCalledWith(
      'Yandi',
      'yandi@test.com',
      'password123'
    )
  })

  it('should show alert when fields are empty', async () => {
    // Arrange
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>
    )

    const registerButton = screen.getByRole('button', { name: 'Register' })

    // Action
    await userEvent.click(registerButton)

    // Assert
    expect(alertMock).toHaveBeenCalledWith(
      'Semua field harus diisi!'
    )
  })

  it('should show alert when password less than 6 characters', async () => {
    // Arrange
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(
      <MemoryRouter>
        <RegisterInput onRegister={() => {}} />
      </MemoryRouter>
    )

    const nameInput = screen.getByLabelText('Name:')
    const emailInput = screen.getByLabelText('Email:')
    const passwordInput = screen.getByLabelText('Password:')
    const registerButton = screen.getByRole('button', { name: 'Register' })

    // Action
    await userEvent.type(nameInput, 'Yandi')
    await userEvent.type(emailInput, 'yandi@test.com')
    await userEvent.type(passwordInput, '123')

    await userEvent.click(registerButton)

    // Assert
    expect(alertMock).toHaveBeenCalledWith(
      'Password harus memiliki minimal 6 karakter!'
    )
  })
})
