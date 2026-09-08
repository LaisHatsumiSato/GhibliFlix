import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Button from '../components/Button'

describe('Button', () => {
  it('renders its title and handles clicks', () => {
    const handleClick = vi.fn()

    render(<Button title="Ver detalhes" onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button', { name: 'Ver detalhes' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies the details button style', () => {
    render(<Button title="Assistir" />)

    expect(screen.getByRole('button', { name: 'Assistir' })).toHaveClass(
      'detailsButton'
    )
  })

  it('does not require a click handler', () => {
    render(<Button title="Sem ação" />)

    expect(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Sem ação' }))
    }).not.toThrow()
  })

  it('renders a different title when the title prop changes', () => {
    const { rerender } = render(<Button title="Assistir" />)

    rerender(<Button title="Pausar" />)

    expect(screen.getByRole('button', { name: 'Pausar' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Assistir' })).not.toBeInTheDocument()
  })

  it('renders an empty title without creating extra text', () => {
    render(<Button title="" />)

    expect(screen.getByRole('button')).toHaveTextContent('')
  })
})