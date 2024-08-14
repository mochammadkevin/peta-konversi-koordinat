import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DmsToDdForm from './DmsToDdForm';

/**
 * Test suite for the DmsToDdForm component.
 */
describe('DmsToDdForm', () => {
  /**
   * Tests that the form elements are rendered correctly.
   */
  test('renders form elements', () => {
    // Render the DmsToDdForm component
    render(<DmsToDdForm onAddToMap={() => {}} />);
    
    // Assert that the input fields for degrees, minutes, and seconds are rendered
    expect(screen.getAllByPlaceholderText('Degrees')[0]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Minutes')[0]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText('Seconds')[0]).toBeInTheDocument();
    
    // Assert that the 'Convert' button is rendered
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });
});
