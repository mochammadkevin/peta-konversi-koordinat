import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MapComponent from './MapComponent';
import { Map } from 'ol';

// Mocking the OpenLayers Map class
jest.mock('ol', () => ({
  Map: jest.fn().mockImplementation(() => ({
    getView: jest.fn().mockReturnValue({
      setCenter: jest.fn(),
    }),
  })),
}));

/**
 * Test suite for MapComponent
 */
describe('MapComponent', () => {
  /**
   * Test case to verify if the map container renders correctly
   */
  test('renders map container', () => {
    render(<MapComponent coordinates={{ lat: 0, lon: 0 }} />);
    expect(document.getElementById('map')).toBeInTheDocument();
  });
});
