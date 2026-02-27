import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThreadInput from './ThreadInput'
/**
 * test scenario for ThreadInput component
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call Add Thread function when submit/buat button is clicked
 */
describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />)

    const titleInput = screen.getByPlaceholderText('Judul')

    // Action
    await userEvent.type(titleInput, 'Judul Thread')

    // Assert
    expect(titleInput.value).toBe('Judul Thread')
  })

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />)

    const categoryInput = screen.getByPlaceholderText('Kategori')

    // Action
    await userEvent.type(categoryInput, 'React')

    // Assert
    expect(categoryInput.value).toBe('React')
  })

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />)

    const bodyInput = screen.getByTestId('body-input')

    // Action
    await userEvent.type(bodyInput, 'Isi diskusi thread')

    // Assert
    expect(bodyInput.value).toBe('Isi diskusi thread')
  })

  it('should call onAddThread function when form submitted correctly', async () => {
    // Arrange
    const mockAddThread = vi.fn()

    render(<ThreadInput onAddThread={mockAddThread} />)

    const titleInput = screen.getByPlaceholderText('Judul')
    const categoryInput = screen.getByPlaceholderText('Kategori')
    const bodyInput = screen.getByTestId('body-input')
    const submitButton = screen.getByRole('button', { name: 'Buat' })

    // Action
    await userEvent.type(titleInput, 'Judul Thread')
    await userEvent.type(categoryInput, 'React')
    await userEvent.type(bodyInput, 'Isi thread')

    await userEvent.click(submitButton)

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith(
      'Judul Thread',
      'React',
      'Isi thread'
    )
  })

  it('should show alert when fields are empty', async () => {
    // Arrange
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<ThreadInput onAddThread={() => {}} />)

    const submitButton = screen.getByRole('button', { name: 'Buat' })

    // Action
    await userEvent.click(submitButton)

    // Assert
    expect(alertMock).toHaveBeenCalledWith(
      'Semua field harus diisi!'
    )
  })
})
