import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import Banner from '../components/Banner'

describe('Banner', () => {
  it('renders movie information and handles details click', () => {
    const handleClick = vi.fn()

    render(
      <Banner
        banner="banner.jpg"
        onClick={handleClick}
        score="97"
        time="120"
        title="Meu Filme"
      />
    )

    expect(screen.getByRole('heading', { name: 'Meu Filme' })).toBeInTheDocument()
    expect(screen.getByText('Score 97')).toBeInTheDocument()
    expect(screen.getByText('Duração 120 min')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Ver Detalhes' }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('uses the banner URL as the background image', () => {
    render(
      <Banner
        banner="banner.jpg"
        score="90"
        time="100"
        title="Outro Filme"
      />
    )

    expect(document.querySelector('.banner')).toHaveStyle(
      'background-image: url(banner.jpg)'
    )
  })

  it('renders accessible labels for the score and duration icons', () => {
    render(<Banner banner="banner.jpg" score="90" time="100" title="Filme" />)

    expect(screen.getByRole('img', { name: 'Score' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Duração' })).toBeInTheDocument()
  })

  it('updates the displayed movie information when props change', () => {
    const { rerender } = render(
      <Banner banner="first.jpg" score="80" time="90" title="Primeiro Filme" />
    )

    rerender(
      <Banner banner="second.jpg" score="95" time="110" title="Segundo Filme" />
    )

    expect(screen.getByRole('heading', { name: 'Segundo Filme' })).toBeInTheDocument()
    expect(screen.getByText('Score 95')).toBeInTheDocument()
    expect(screen.getByText('Duração 110 min')).toBeInTheDocument()
  })

  it('renders the details button with its expected label', () => {
    render(<Banner banner="banner.jpg" score="90" time="100" title="Filme" />)

    expect(screen.getByRole('button', { name: 'Ver Detalhes' })).toBeInTheDocument()
  })
})