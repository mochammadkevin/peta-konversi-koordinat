import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DdToDmsForm from './DdToDmsForm';
import { ddToDms } from '../../utils/conversionUtils';

jest.mock('../../utils/conversionUtils', () => ({
  ddToDms: jest.fn(),
}));

/**
 * Test suite for the DdToDmsForm component.
 */
describe('DdToDmsForm', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    ddToDms.mockClear();
  });

  /**
   * Tests the conversion of decimal degrees to degrees, minutes, and seconds
   * on form submission.
   */
  test('converts DD to DMS on submit', () => {
    // Mock return value for ddToDms function
    ddToDms.mockReturnValue({ degrees: 65, minutes: 43, seconds: 21 });

    // Render the DdToDmsForm component
    render(<DdToDmsForm onAddToMap={() => {}} />);

    // Simulate user input for latitude and longitude
    fireEvent.change(screen.getByPlaceholderText('Latitude'), { target: { value: '12.3456' } });
    fireEvent.change(screen.getByPlaceholderText('Longitude'), { target: { value: '65.4321' } });
    
    // Simulate form submission
    fireEvent.click(screen.getByText('Convert'));

    // Assert that ddToDms was called with the correct latitude value
    expect(ddToDms).toHaveBeenCalledWith('12.3456');

    // Assert that the converted latitude and longitude are displayed correctly
    expect(screen.getByText(/Latitude: 65° 43' 21"/)).toBeInTheDocument();
    expect(screen.getByText(/Longitude: 65° 43' 21"/)).toBeInTheDocument();
  });
});
