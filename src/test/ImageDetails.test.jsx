import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ImageDetails from '../components/ImageDetails'

describe('ImageDetails', () => {
  it('renders the movie image with its alternative text', () => {
    render(<ImageDetails alt="Meu Filme" image="movie.jpg" />)

    expect(screen.getByRole('img', { name: 'Meu Filme' })).toHaveAttribute(
      'src',
      'movie.jpg'
    )
  })

  it('applies the movie image CSS class', () => {
    render(<ImageDetails alt="Meu Filme" image="movie.jpg" />)

    expect(screen.getByRole('img', { name: 'Meu Filme' })).toHaveClass('movieImg')
  })

  it('updates the image source when the image prop changes', () => {
    const { rerender } = render(
      <ImageDetails alt="Meu Filme" image="first-movie.jpg" />
    )

    rerender(<ImageDetails alt="Meu Filme" image="second-movie.jpg" />)

    expect(screen.getByRole('img', { name: 'Meu Filme' })).toHaveAttribute(
      'src',
      'second-movie.jpg'
    )
  })
})