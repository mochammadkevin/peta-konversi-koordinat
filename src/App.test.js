import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

/**
 * Tests for the App Component.
 */
describe('App Component', () => {
  /**
   * Test to check if the "learn react" link is rendered.
   */
  test('renders the "learn react" link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  /**
   * Test to check if the map component is rendered.
   */
  test('should render the map component', () => {
    render(<App />);
    expect(screen.getByTestId('map-component')).toBeInTheDocument();
  });

  /**
   * Test to check if the modal opens when the "Convert Coordinates" button is clicked.
   */
  test('should open modal when the convert coordinates button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Convert Coordinates'));
    expect(screen.getByText('DMS to DD')).toBeInTheDocument();
    expect(screen.getByText('DD to DMS')).toBeInTheDocument();
  });

  /**
   * Test to check if tabs switch between "DMS to DD" and "DD to DMS".
   */
  test('should switch tabs between DMS to DD and DD to DMS', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Convert Coordinates'));

    fireEvent.click(screen.getByText('DD to DMS'));
    expect(screen.getByText('DD to DMS')).toHaveClass('bg-green-600');
    expect(screen.getByText('DMS to DD')).not.toHaveClass('bg-green-600');

    fireEvent.click(screen.getByText('DMS to DD'));
    expect(screen.getByText('DMS to DD')).toHaveClass('bg-green-600');
    expect(screen.getByText('DD to DMS')).not.toHaveClass('bg-green-600');
  });

  /**
   * Test to check if the modal closes when the "Close" button is clicked.
   */
  test('should close modal when the close button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Convert Coordinates'));
    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('DMS to DD')).not.toBeInTheDocument();
    expect(screen.queryByText('DD to DMS')).not.toBeInTheDocument();
  });
});
