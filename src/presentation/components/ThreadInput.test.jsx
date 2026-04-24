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
 *   - should call onAddThread with correct object when form submitted
 *   - should show inline error when fields are empty
 */
describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />)

    const titleInput = screen.getByPlaceholderText('Apa yang ingin kamu bahas?')

    // Action
    await userEvent.type(titleInput, 'Judul Thread')

    // Assert
    expect(titleInput.value).toBe('Judul Thread')
  })

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />)

    const categoryInput = screen.getByPlaceholderText('e.g. react, javascript, ui-design')

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

  it('should call onAddThread with correct object when form submitted', async () => {
    // Arrange
    const mockAddThread = vi.fn()

    render(<ThreadInput onAddThread={mockAddThread} />)

    const titleInput = screen.getByPlaceholderText('Apa yang ingin kamu bahas?')
    const categoryInput = screen.getByPlaceholderText('e.g. react, javascript, ui-design')
    const bodyInput = screen.getByTestId('body-input')
    const submitButton = screen.getByRole('button', { name: /publikasikan sekarang/i })

    // Action
    await userEvent.type(titleInput, 'Judul Thread')
    await userEvent.type(categoryInput, 'React')
    await userEvent.type(bodyInput, 'Isi thread')

    await userEvent.click(submitButton)

    // Assert — onAddThread now receives a single object
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Judul Thread',
      category: 'React',
      body: 'Isi thread'
    })
  })

  it('should show inline error when fields are empty', async () => {
    // Arrange
    render(<ThreadInput onAddThread={() => {}} />)

    const submitButton = screen.getByRole('button', { name: /publikasikan sekarang/i })

    // Action
    await userEvent.click(submitButton)

    // Assert — error is now shown inline, not via alert()
    expect(screen.getByText('Semua field harus diisi!')).toBeInTheDocument()
  })
})

