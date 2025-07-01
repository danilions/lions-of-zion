import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero component', () => {
  it('renders the heading "LIONS OF ZION"', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { name: /lions of zion/i });
    expect(heading).toBeInTheDocument();
  });
});

