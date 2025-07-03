import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../ui/Hero';

// Mock next/image since it's used in the Hero component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={props.src} alt={props.alt} />
  },
}));

describe('Hero Component', () => {
  it('renders without crashing', () => {
    render(<Hero />);
    // The component should render without throwing any errors
  });
});
