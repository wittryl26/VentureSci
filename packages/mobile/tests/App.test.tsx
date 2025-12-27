import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../src/App';

describe('App', () => {
  it('renders the startup header and welcome text', () => {
    render(<App />);

    expect(screen.getByRole('header', { name: /VentureSci Mobile/i })).toBeTruthy();
    expect(screen.getByText(/welcome to the venturesci mobile experience/i)).toBeTruthy();
  });
});
