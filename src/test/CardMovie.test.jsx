import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import CardMovie from '../components/CardMovie'

describe('CardMovie', () => {
  it('renders the movie title and handles clicks', () => {
    const handleClick = vi.fn()

    render(
      <CardMovie
        height="275px"
        image="movie.jpg"
        onClick={handleClick}
        title="Meu Filme"
        width="180px"
      />
    )

    expect(screen.getByRole('heading', { name: 'Meu Filme' })).toBeInTheDocument()
    fireEvent.click(screen.getByText('Meu Filme'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies the configured card dimensions and image source', () => {
    render(
      <CardMovie
        height="300px"
        image="another-movie.jpg"
        title="Outro Filme"
        width="200px"
      />
    )

    const card = document.querySelector('.card')
    expect(card).toHaveStyle({ height: '300px', width: '200px' })
    expect(card.querySelector('img')).toHaveAttribute('src', 'another-movie.jpg')
  })

  it('renders the movie image without an alt text when none is provided', () => {
    render(<CardMovie image="movie.jpg" title="Filme sem descrição" />)

    expect(document.querySelector('.card img')).toHaveAttribute('src', 'movie.jpg')
    expect(document.querySelector('.card img')).not.toHaveAttribute('alt')
  })

  it('does not call the callback when the card is only rendered', () => {
    const handleClick = vi.fn()

    render(<CardMovie onClick={handleClick} title="Filme" />)

    expect(handleClick).not.toHaveBeenCalled()
  })
})