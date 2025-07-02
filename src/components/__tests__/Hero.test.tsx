import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero component', () => {
  it('renders at least one heading', () => {
    render(<Hero />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });
});
